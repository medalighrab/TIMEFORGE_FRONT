import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeManagementTechniques } from '../models/time-management-techniques';

@Injectable({
  providedIn: 'root'
})
export class TimeManagementTechniquesService {
  private baseUrl = 'http://localhost:8089/api/time-techniques'; // 🛠 URL complète ajoutée

  constructor(private http: HttpClient) {}

  getAll(): Observable<TimeManagementTechniques[]> {
    return this.http.get<TimeManagementTechniques[]>(this.baseUrl);
  }

  getById(id: number): Observable<TimeManagementTechniques> {
    return this.http.get<TimeManagementTechniques>(`${this.baseUrl}/${id}`);
  }

  create(technique: TimeManagementTechniques): Observable<TimeManagementTechniques> {
    return this.http.post<TimeManagementTechniques>(this.baseUrl, technique);
  }

  update(id: number, technique: TimeManagementTechniques): Observable<TimeManagementTechniques> {
    return this.http.put<TimeManagementTechniques>(`${this.baseUrl}/${id}`, technique);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
