import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../service/goals.service'; // Import the service

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})


export class GoalsComponent implements OnInit {
  goals: any[] = [];
  goal: any = {};

  constructor(private goalsService: GoalsService) { }

  ngOnInit(): void {
    this.loadGoals();
  }

  // Charger tous les objectifs
  loadGoals(): void {
    this.goalsService.getgoalbytaskid().subscribe(
      (data) => {
        this.goals = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des objectifs', error);
      }
    );
  }

 
  getStatusClass(status: string): string {
    if (status === 'Done') {
      return 'Done';  // Green color for done
    } else if (status === 'InProgress') {
      return 'InProgress';  // Blue color for in-progress
    }
    return '';  // Default no color
  }

  // Supprimer un objectif
  deleteGoal(id: number): void {
    this.goalsService.deleteGoal(id).subscribe(
      () => {
        console.log('Objectif supprimé avec succès');
        this.loadGoals(); // Recharger la liste des objectifs
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'objectif', error);
      }
    );
  }

  // Function to calculate the duration between start and end date
  calculateDuration(startDate: string, endDate: string): string {
    if (!startDate || !endDate) {
      return ''; // Return empty string if no start or end date
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate the difference in milliseconds, then convert to days
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return `${duration} days`;
  }

  formatDate(date: string): string {

    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(newDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  isActiveGoal(endDate: string): boolean {
    const currentDate = new Date();
    const goalEndDate = new Date(endDate);
    return goalEndDate > currentDate;
  }

}
