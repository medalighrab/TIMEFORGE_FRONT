import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GoalsService } from '../service/goals.service';
import { Chart, registerables } from 'chart.js';
import { ChatgptService } from '../../chatgpt.service';

interface Prediction {
  start_date: string;
  end_date: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit, AfterViewInit {
  goals: any[] = [];
  translatedDescriptions: { [goalId: number]: string } = {};
  prediction: Prediction | null = null;
  isDrawerOpen: boolean = false;
  selectedTask: any = null;
  userId: number = 1;
  userScore: number = 0;
  title: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  statusGoal: string = 'NOT_STARTED';
  chart: any;
  score: number = 0;
  maxScore: number = 100;

  // ChatGPT variables
  chatVisible: boolean = false;
  userMessage: string = '';
  messages: { sender: string, text: string }[] = [];

  constructor(
    private goalsService: GoalsService,
    private chatService: ChatgptService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadGoals();
    this.getUserScore();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Objectifs atteints',
          data: [10, 20, 30, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  updateChartData(newData: number[]): void {
    this.chart.data.datasets[0].data = newData;
    this.chart.update();
  }

  loadNewDataFromApi(): void {
    this.goalsService.getNewGoalData().subscribe((newData: number[]) => {
      this.updateChartData(newData);
    });
  }

  loadGoals(): void {
    this.goalsService.getgoalbytaskid().subscribe(
      data => this.goals = data,
      err => console.error('Erreur chargement objectifs', err)
    );
  }

  deleteGoal(id: number): void {
    this.goalsService.deleteGoal(id).subscribe(
      () => this.loadGoals(),
      err => console.error('Erreur suppression', err)
    );
  }

  toggleChronic(goal: any): void {
    this.goalsService.GoalActivChronics(goal.id, !goal.chronicActive).subscribe(
      () => goal.chronicActive = !goal.chronicActive,
      err => console.error('Erreur toggle chronique', err)
    );
  }

  calculateDuration(startDate: string, endDate: string): string {
    if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) return '';
    const msPerDay = 1000 * 3600 * 24;
    const diffDays = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / msPerDay);
    return `${diffDays} jours`;
  }

  private isValidDate(d: string): boolean {
    return !isNaN(new Date(d).getTime());
  }

  formatDate(d: string): string {
    if (!this.isValidDate(d)) return '';
    const dt = new Date(d);
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    return `${dt.getFullYear()}-${mm}-${dd}`;
  }

  translateGoalDescription(goal: any): void {
    const input = goal.description?.trim();
    if (!input) return;

    this.goalsService.translateGoalText(input, 'en', 'fr').subscribe(
      translated => this.translatedDescriptions[goal.id] = translated,
      err => {
        console.error('Erreur traduction', err);
        this.translatedDescriptions[goal.id] = 'Erreur lors de la traduction.';
      }
    );
  }

  // Updated to handle both original and translated text
  readScript(goal: any, customText?: string): void {
    const textToRead = customText || goal.description;
    if (textToRead) {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Aucun texte disponible pour la lecture.');
    }
  }

  predictGoal(): void {
    this.goalsService.predictNextGoal().subscribe({
      next: (data) => {
        if (data && typeof data === 'object') {
          this.prediction = data;
          this.isDrawerOpen = true;
        } else {
          console.error('Données de prédiction incorrectes', data);
        }
      },
      error: (err: any) => {
        console.error('ERREUR COMPLÈTE:', err);
      }
    });
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  assignGoal(): void {
    const goal = {
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.statusGoal
    };

    this.goalsService.saveGoal(goal).subscribe(
      () => {
        console.log('Goal saved successfully');
        this.closeDrawer();
        this.loadGoals();
        this.getUserScore();
      },
      err => console.error('Erreur lors de la sauvegarde de l\'objectif', err)
    );
  }

  getUserScore(): void {
    this.goalsService.getUserScore(this.userId).subscribe(
      data => this.score = data,
      error => console.error('Erreur récupération score', error)
    );
  }

  downloadPdf(goalId: number): void {
    this.goalsService.downloadGoalReport(goalId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `goal-report-${goalId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('PDF download failed', error);
    });
  }

  toggleChat(): void {
    this.chatVisible = !this.chatVisible;
  }

  sendMessage(): void {
    if (!this.userMessage.trim()) return;

    this.messages.push({ sender: 'Vous', text: this.userMessage });

    this.chatService.askQuestion(this.userMessage).subscribe({
      next: (res: any) => {
        const botReply = res.reply || 'Réponse non disponible';
        this.messages.push({ sender: 'ChatGPT', text: botReply });
      },
      error: (err: any) => {
        this.messages.push({ sender: 'ChatGPT', text: 'Erreur : ' + err.message });
      }
    });

    this.userMessage = '';
  }
}