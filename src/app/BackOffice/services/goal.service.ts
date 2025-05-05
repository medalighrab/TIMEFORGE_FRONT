import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private apiUrl = 'http://localhost:8089/api/goals'; // Assurez-vous que le port correspond à votre backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les objectifs
  getAllGoals(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Ajouter un objectif
  addGoal(goal: any, taskId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${taskId}`, goal);
  }

  // Supprimer un objectif
  deleteGoal(goalId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${goalId}`);
  }

  // Récupérer un objectif par son ID
  getGoalById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Récupérer des objectifs par tâche
  getGoalsByTask(taskId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/goalbytaks/${taskId}`);
  }

  // Prédire un prochain objectif
  predictNextGoal(): Observable<any> {
    return this.http.get(`${this.apiUrl}/next`, { responseType: 'text' });
  }

  // Prédire un objectif simple
  predictSimpleGoal(): Observable<any> {
    return this.http.get(`${this.apiUrl}/predict`, { responseType: 'text' });
  }

  // Vérifier la toxicité du texte
  checkToxicity(text: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/toxicity-check`, { 
      params: { text }, 
      responseType: 'text' 
    });
  }

  // Récupérer toutes les tâches
  getAllTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/taksbygoals`);
  }
}
