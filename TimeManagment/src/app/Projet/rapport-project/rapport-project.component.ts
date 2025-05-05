// 🚀 Ajout du camembert + timeline dans ton RapportProjectComponent Angular

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MyServiceService } from 'src/app/services/my-service.service';
import { ProjectEstimationService } from 'src/app/services/ProjectEstimationService';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Task } from 'src/app/models/Task';
import { User } from 'src/app/models/User';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Chart, registerables } from 'chart.js';
import autoTable from 'jspdf-autotable';


Chart.register(...registerables);

interface TaskGroups {
  TODO: Task[];
  IN_PROGRESS: Task[];
  DONE: Task[];
  BLOCKED: Task[];
  [key: string]: Task[];
}

@Component({
  selector: 'app-rapport-project',
  templateUrl: './rapport-project.component.html',
  styleUrls: ['./rapport-project.component.css']
})
export class RapportProjectComponent implements OnInit {

  projectId!: number;
  project: any;
  tasksByStatus: TaskGroups = { TODO: [], IN_PROGRESS: [], DONE: [], BLOCKED: [] };
  employeesOverloaded: User[] = [];
  employeesNotOverloaded: User[] = [];
  overloadThreshold: number = 0;
  projectProgress: number = 0;
  estimatedEndDate!: Date;
  realDeadline!: Date;
  solutionMessage: string = '';
  solutionApplied: boolean = false;
  applySolutionRequested: boolean = false;
  currentDate: Date = new Date();
  solutionRejected: boolean = false;  

  constructor(
    private route: ActivatedRoute,
    private myService: MyServiceService,
    private estimationService: ProjectEstimationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProjectData();
  }

  loadProjectData(): void {
    forkJoin({
      project: this.myService.getProjectById(this.projectId),
      tasks: this.myService.getTasksByProjectId(this.projectId),
      users: this.myService.getUsersByProjectId(this.projectId)
    }).subscribe(({ project, tasks, users }) => {
      this.project = project;
      this.tasksByStatus = this.groupTasksByStatus(tasks);
      this.calculateProgress(tasks);
      this.classifyEmployees(users, tasks);
      this.calculateRealDeadline(tasks);
      this.predictEndDate();
      setTimeout(() => this.generateChart(), 500);
    });
  }

  groupTasksByStatus(tasks: Task[]): TaskGroups {
    const grouped: TaskGroups = { TODO: [], IN_PROGRESS: [], DONE: [], BLOCKED: [] };
   tasks.forEach(task => {
  if (task.status && grouped[task.status]) {
    grouped[task.status].push(task);
  }
});

    return grouped;
  }

  calculateProgress(tasks: Task[]): void {
    const done = tasks.filter(t => t.status === 'DONE').length;
    this.projectProgress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  }

  classifyEmployees(users: User[], tasks: Task[]): void {
    const taskCount = new Map<number, number>();
    tasks.forEach(t => {
      if (t.employee11?.id) taskCount.set(t.employee11.id, (taskCount.get(t.employee11.id) || 0) + 1);
    });
    this.overloadThreshold = tasks.length / Math.max(users.length, 1);
    this.employeesOverloaded = users.filter(u => (taskCount.get(u.id) || 0) > this.overloadThreshold);
    this.employeesNotOverloaded = users.filter(u => !this.employeesOverloaded.includes(u));
  }

  calculateRealDeadline(tasks: Task[]): void {
    const deadlines = tasks.map(t => new Date(t.deadline));
    this.realDeadline = new Date(Math.max(...deadlines.map(d => d.getTime())));
  }

  predictEndDate(): void {
    this.estimationService.estimateEndDate(this.projectId).subscribe(response => {
      this.estimatedEndDate = new Date(response.estimated_end_date);
      this.suggestSolution();
    });
  }

  suggestSolution(): void {
    this.estimationService.suggestSolution(this.projectId).subscribe(response => {
      this.solutionMessage = response.solution;
    });
  }

  requestApplySolution(): void {
    this.applySolutionRequested = true;
  }

  applySolution() {
    this.estimationService.applySolution(this.projectId, true).subscribe(
      (response) => {
        console.log('✅ Solution appliquée :', response);
        this.solutionApplied = true;
        this.solutionRejected = false;
        this.loadProjectData();  // 🔥 Correct ici
      },
      (error) => {
        console.error('Erreur lors de l’application de la solution :', error);
      }
    );
  }
  rejectSolution() {
    this.solutionApplied = false;
    this.solutionRejected = true;
  }
  generateChart(): void {
    const ctx = document.getElementById('taskPieChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['TODO', 'IN_PROGRESS', 'DONE', 'BLOCKED'],
        datasets: [{
          data: [
            this.tasksByStatus.TODO.length,
            this.tasksByStatus.IN_PROGRESS.length,
            this.tasksByStatus.DONE.length,
            this.tasksByStatus.BLOCKED.length
          ],
          backgroundColor: [
            '#f39c12', '#3498db', '#2ecc71', '#e74c3c'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  async printPDF(): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 14;
  
    const addFooter = (pageNum: number, totalPages: number) => {
      pdf.setFontSize(10);
      pdf.setTextColor(0);
      pdf.setDrawColor(0);
      pdf.line(margin, pageHeight - 15, pdf.internal.pageSize.getWidth() - margin, pageHeight - 15);
      pdf.text('TimeForge © 2025', margin, pageHeight - 8);
      pdf.text(`Page ${pageNum} / ${totalPages}`, pdf.internal.pageSize.getWidth() - margin, pageHeight - 8, { align: 'right' });
    };
  
    // En-tête
    pdf.setDrawColor(0);
    pdf.rect(margin, margin, pdf.internal.pageSize.getWidth() - margin * 2, pageHeight - margin * 2);
    pdf.addImage('assets/logo-timeforge.png', 'PNG', margin + 2, margin + 2, 30, 30);
    pdf.setFontSize(18);
    pdf.setTextColor(40, 40, 100);
    pdf.text(`Rapport du Projet : ${this.project?.name}`, margin + 40, margin + 15);
  
    let currentY = margin + 40;
    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.text(`Date de génération : ${this.currentDate.toLocaleDateString()}`, margin + 2, currentY);
    currentY += 10;
  
    // Barre de progression (graphique simple)
    pdf.setFontSize(14);
    pdf.text('Progression du projet', margin + 2, currentY += 10);
    pdf.setDrawColor(0);
    pdf.rect(margin + 2, currentY + 5, 100, 8);
    pdf.setFillColor(40, 180, 99);
    pdf.rect(margin + 2, currentY + 5, this.projectProgress, 8, 'F');
    pdf.text(`${this.projectProgress}%`, margin + 110, currentY + 11);
    currentY += 20;
  
    // Répartition des tâches
    pdf.setFontSize(14);
    pdf.text('Répartition des tâches', margin + 2, currentY);
    const statuses = ['TODO', 'IN_PROGRESS', 'DONE', 'BLOCKED'];
    statuses.forEach(status => {
      const count = this.tasksByStatus[status]?.length || 0;
      let color: [number, number, number] = [0, 0, 0];
      if (status === 'TODO') color = [243, 156, 18];
      if (status === 'IN_PROGRESS') color = [52, 152, 219];
      if (status === 'DONE') color = [46, 204, 113];
      if (status === 'BLOCKED') color = [231, 76, 60];
      pdf.setTextColor(...color);
      pdf.text(`${status}: ${count}`, margin + 2, (currentY += 8));
    });
  
    // Graphique Camembert
    const chartCanvas = document.getElementById('taskPieChart') as HTMLCanvasElement;
    if (chartCanvas) {
      const chartImg = chartCanvas.toDataURL('image/png');
      pdf.addPage();
      pdf.rect(margin, margin, pdf.internal.pageSize.getWidth() - margin * 2, pageHeight - margin * 2);
      pdf.setFontSize(16);
      pdf.setTextColor(40, 100, 180);
      pdf.text('Graphique des tâches', margin + 2, margin + 10);
      pdf.addImage(chartImg, 'PNG', margin + 2, margin + 15, 180, 130);
    }
  
    // Employés surchargés et non surchargés
    const addEmployeeSection = (title: string, users: any[]) => {
      if (users.length > 0) {
        pdf.addPage();
        pdf.rect(margin, margin, pdf.internal.pageSize.getWidth() - margin * 2, pageHeight - margin * 2);
        pdf.setFontSize(16);
        pdf.setTextColor(40, 100, 180);
        pdf.text(title, margin + 2, margin + 10);
        autoTable(pdf, {
          head: [['Nom', 'Email']],
          body: users.map(u => [u.username, u.email]),
          startY: margin + 15,
          margin: { left: margin, right: margin },
          theme: 'grid'
        });
      }
    };
    addEmployeeSection('Employés Surchargés', this.employeesOverloaded);
    addEmployeeSection('Employés Non Surchargés', this.employeesNotOverloaded);
  
    // Liste des tâches dans des tableaux
    statuses.forEach(status => {
      const tasks = this.tasksByStatus[status];
      if (tasks && tasks.length > 0) {
        pdf.addPage();
        pdf.rect(margin, margin, pdf.internal.pageSize.getWidth() - margin * 2, pageHeight - margin * 2);
        pdf.setFontSize(16);
        pdf.setTextColor(40, 100, 180);
        pdf.text(`Tâches - ${status}`, margin + 2, margin + 10);
        autoTable(pdf, {
          head: [['Nom', 'Assignée à', 'Description']],
          body: tasks.map(t => [t.name, t.employee11?.name || 'Non assigné', t.description || '']),
          startY: margin + 15,
          margin: { left: margin, right: margin },
          theme: 'grid'
        });
      }
    });
  
    // Footer sur chaque page
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      addFooter(i, totalPages);
    }
  
    pdf.save(`rapport-projet-${this.projectId}-${this.currentDate.toISOString().slice(0,10)}.pdf`);
  }
  
  
  

  

  getProgressColor(): string {
    if (this.projectProgress < 30) return 'progress-danger';
    if (this.projectProgress < 70) return 'progress-warning';
    return 'progress-success';
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  }
  
  shareOnLinkedIn(): void {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
  }
  
  shareOnTwitter(): void {
    const text = `Rapport du projet #${this.projectId}`;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank', 'width=600,height=400');
  }
  
}
