import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = "http://localhost:8089"; // URL de base de l'API

  constructor(private http: HttpClient) { }

  // Récupérer la liste des tâches
  TaskList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tasks/all`);
  }

  // Ajouter un objectif et l'assigner à une tâche
  addGoalandassigntotask(GoalData: any, TaskId: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/goals/add/${TaskId}`, GoalData);
  }
}