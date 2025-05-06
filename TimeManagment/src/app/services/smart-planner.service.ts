import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SessionPlan {
  sessionTitle: string;
  techniqueName: string;
  date: string;
  startTime: string;
  endTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class SmartPlannerService {

  private baseUrl = 'http://localhost:8089/api/smart-planner';

  constructor(private http: HttpClient) { }

  generatePlan(): Observable<SessionPlan[]> {
    return this.http.get<SessionPlan[]>(`${this.baseUrl}/generate`);
  }
}
