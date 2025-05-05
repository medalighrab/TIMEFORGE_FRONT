import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/Task';
import { User } from 'src/app/models/User';
import { MyServiceService } from 'src/app/services/my-service.service';
import { IaInsightService } from 'src/app/services/IaInsightService';

@Component({
  selector: 'app-projet-detail',
  templateUrl: './projet-detail.component.html',
  styleUrls: ['./projet-detail.component.css']
})
export class ProjetDetailComponent implements OnInit {
  projectId!: number;
  project: any;
  tasks: Task[] = [];
  users: User[] = [];
  projectProgress: number = 0;
  notification: string = '';
  predictedSummary: string = '';
  predictedStress: string = '';
  analysisError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private myService: MyServiceService,
    private router: Router,
    private iaInsightService: IaInsightService
  ) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;

    this.myService.getProjectById(this.projectId).subscribe(data => {
      this.project = data;
    });

    this.loadTasksAndUsers();
  }

  private loadTasksAndUsers(): void {
    this.myService.getTasksByProjectId(this.projectId).subscribe((tasksData: Task[]) => {
      this.tasks = tasksData;
      this.projectProgress = this.calculateProgress(tasksData);
    });

    this.myService.getUsersByProjectId(this.projectId).subscribe((usersData: User[]) => {
      this.users = usersData;
    });
  }

  public getProgressColor(): string {
    if (this.projectProgress < 30) return 'progress-danger';
    if (this.projectProgress < 70) return 'progress-warning';
    return 'progress-success';
  }

  private calculateProgress(tasks: Task[]): number {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'DONE').length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }

  deleteProject(projectId: number): void {
    if (!projectId) {
      this.notification = 'ID du projet manquant ou invalide';
      setTimeout(() => this.notification = '', 3000);
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.myService.deleteProject(projectId).subscribe({
        next: (res) => {
          if (res === 'Project deleted successfully') {
            this.handleSuccess('Projet supprimé avec succès !');
            setTimeout(() => {
              this.router.navigate(['/A']);
            }, 1500);
          } else {
            this.notification = 'Échec de la suppression du projet !';
            setTimeout(() => this.notification = '', 3000);
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la suppression:', error);
          this.notification = 'Erreur lors de la suppression du projet !';
          setTimeout(() => this.notification = '', 3000);
        }
      });
    }
  }

  private handleSuccess(message: string): void {
    this.notification = message;
  }

  analyzeProjectComments(): void {
    this.myService.getCommentsByProject(this.projectId).subscribe(
      (commentsData: any[]) => {
        const commentsTextArray = commentsData.map((c) => c.comment);
        console.log('✅ Commentaires récupérés :', commentsTextArray);

        this.iaInsightService.analyzeComments(commentsTextArray).subscribe(
          (result) => {
            console.log('✅ Résultat IA :', result);
            this.predictedSummary = result.summary;
            this.predictedStress = result.stress_level;
            this.analysisError = false;
          },
          (error: any) => {
            console.error('❌ Erreur lors de l\'analyse IA:', error);
            this.analysisError = true;
          }
        );
      },
      (error: any) => {
        console.error('❌ Erreur récupération commentaires:', error);
        this.analysisError = true;
      }
    );
  }
}
