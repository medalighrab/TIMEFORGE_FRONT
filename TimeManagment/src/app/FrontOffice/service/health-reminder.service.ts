import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HealthReminder {
  id?: number;
  notifications?: any[];
  typeReminder?: string; // Ajouter le typeReminder

}

@Injectable({
  providedIn: 'root'
})
export class HealthReminderService {
  private apiUrl = 'http://localhost:8089/api/health-reminders';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<HealthReminder> {
    return this.http.get<HealthReminder>(`${this.apiUrl}/${id}`);
  }

  add(reminder: HealthReminder): Observable<HealthReminder> {
    return this.http.post<HealthReminder>(this.apiUrl, reminder);
  }

  update(id: number, reminder: HealthReminder): Observable<HealthReminder> {
    return this.http.put<HealthReminder>(`${this.apiUrl}/${id}`, reminder);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



}
