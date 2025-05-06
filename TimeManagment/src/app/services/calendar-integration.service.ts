import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarIntegration } from '../models/calendar-integration';

@Injectable({
  providedIn: 'root'
})
export class CalendarIntegrationService {
  private baseUrl = 'http://localhost:8089/api/calendar-events'; // 🔥

  constructor(private http: HttpClient) {}

  // 🔥 Fonction pour récupérer les headers avec le token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken'); // Récupérer accessToken stocké
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<CalendarIntegration[]> {
    return this.http.get<CalendarIntegration[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  create(event: CalendarIntegration): Observable<CalendarIntegration> {
    return this.http.post<CalendarIntegration>(this.baseUrl, event, { headers: this.getAuthHeaders() });
  }

  update(id: number, event: CalendarIntegration): Observable<CalendarIntegration> {
    return this.http.put<CalendarIntegration>(`${this.baseUrl}/${id}`, event, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  autoPlan(): Observable<any> {
    return this.http.post('http://localhost:8089/api/calendar-events/auto-plan', {}); // appel spécial
  }
  
}
