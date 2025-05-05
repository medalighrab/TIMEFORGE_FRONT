import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private apiUrl = 'http://localhost:8089/api/goals'; // URL de votre backend Spring

  constructor(private http: HttpClient) { }

  // Récupérer tous les objectifs
  getAllGoals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

 

  // Supprimer un objectif
  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getgoalbytaskid(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/taksbygoals`);
  }
}