import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../services/goal.service';

@Component({
  selector: 'app-admin-goal',
  templateUrl: './admin-goal.component.html',
  styleUrls: ['./admin-goal.component.css']
})
export class AdminGoalComponent implements OnInit {
  goals: any[] = [];
  tasks: any[] = [];
  newGoal = { title: '', description: '', startDate: '', endDate: '' };
  selectedTaskId: number = 0;
  predictedGoal: string = '';
  toxicityResult: string = '';
  textToCheck: string = '';

  constructor(private goalsService: GoalsService) {}

  ngOnInit(): void {
    this.loadGoals();
    this.loadTasks();
  }

  // Charger tous les objectifs
  loadGoals(): void {
    this.goalsService.getAllGoals().subscribe(data => {
      this.goals = data;
    });
  }

  // Charger toutes les tâches
  loadTasks(): void {
    this.goalsService.getAllTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  // Ajouter un objectif
  addGoal(): void {
    if (this.selectedTaskId && this.newGoal.startDate && this.newGoal.endDate) {
      this.goalsService.addGoal(this.newGoal, this.selectedTaskId).subscribe(() => {
        this.loadGoals();
        this.newGoal = { title: '', description: '', startDate: '', endDate: '' }; // Réinitialiser le formulaire
      });
    } else {
      alert('Veuillez sélectionner une tâche et définir les dates de début et de fin.');
    }
  }

  // Supprimer un objectif
  deleteGoal(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.goalsService.deleteGoal(id).subscribe(() => {
        this.loadGoals();
      });
    }
  }

  // Prédire un objectif futur
  predictGoal(): void {
    this.goalsService.predictNextGoal().subscribe(result => {
      this.predictedGoal = result;
    });
  }

  // Prédire un objectif simple
  predictSimple(): void {
    this.goalsService.predictSimpleGoal().subscribe(result => {
      this.predictedGoal = result;
    });
  }

  // Vérifier la toxicité du texte
  checkToxicity(): void {
    if (this.textToCheck.trim()) {
      this.goalsService.checkToxicity(this.textToCheck).subscribe(result => {
        this.toxicityResult = result;
      });
    } else {
      this.toxicityResult = 'Veuillez entrer du texte à vérifier.';
    }
  }
}
