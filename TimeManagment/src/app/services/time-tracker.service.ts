import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeTracker } from '../models/time-tracker';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerService {
  private baseUrl = 'http://localhost:8089/api/time-trackers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TimeTracker[]> {
    return this.http.get<TimeTracker[]>(this.baseUrl);
  }

  create(tracker: TimeTracker): Observable<TimeTracker> {
    return this.http.post<TimeTracker>(this.baseUrl, tracker);
  }

  update(id: number, tracker: TimeTracker): Observable<TimeTracker> {
    return this.http.put<TimeTracker>(`${this.baseUrl}/${id}`, tracker);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  schedule(tracker: TimeTracker): Observable<TimeTracker> {
    return this.http.post<TimeTracker>(`${this.baseUrl}/schedule`, tracker);
  }
}
