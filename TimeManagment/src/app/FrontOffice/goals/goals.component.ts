import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../service/goals.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  goals: any[] = [];
  translatedDescriptions: { [goalId: number]: string } = {};

  constructor(private goalsService: GoalsService) { }

  ngOnInit(): void {
    this.loadGoals();
  }

  // Charge la liste des objectifs
  loadGoals(): void {
    this.goalsService.getgoalbytaskid().subscribe(
      data => this.goals = data,
      err => console.error('Erreur chargement objectifs', err)
    );
  }

  // Supprime un objectif puis recharge la liste
  deleteGoal(id: number): void {
    this.goalsService.deleteGoal(id).subscribe(
      () => this.loadGoals(),
      err => console.error('Erreur suppression', err)
    );
  }

  // Active/désactive le mode chronique
  toggleChronic(goal: any): void {
    this.goalsService.GoalActivChronics(goal.id, !goal.chronicActive).subscribe(
      () => goal.chronicActive = !goal.chronicActive,
      err => console.error('Erreur toggle chronique', err)
    );
  }

  // Calcul de la durée en jours
  calculateDuration(startDate: string, endDate: string): string {
    if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
      return '';
    }
    const msPerDay = 1000 * 3600 * 24;
    const diffDays = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / msPerDay
    );
    return `${diffDays} jours`;
  }

  private isValidDate(d: string): boolean {
    return !isNaN(new Date(d).getTime());
  }

  formatDate(d: string): string {
    if (!this.isValidDate(d)) {
      return '';
    }
    const dt = new Date(d);
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    return `${dt.getFullYear()}-${mm}-${dd}`;
  }

  // Traduction de la description d'un objectif individuel
  translateGoalDescription(goal: any): void {
    const input = goal.description?.trim();

    if (!input) {
      console.warn('Description vide pour la traduction');
      return;
    }

    this.goalsService.translateGoalText(input, 'en', 'fr').subscribe(
      translated => {
        this.translatedDescriptions[goal.id] = translated;
      },
      err => {
        console.error('Erreur traduction', err);
        this.translatedDescriptions[goal.id] = 'Erreur lors de la traduction.';
      }
    );
  }
}
