import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface GamificationProfile {
  id: number;
  xp: number;
  level: number;
  completedTasks: number;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GamificationService {
  private baseUrl = 'http://localhost:8089/api/gamification';
  private profileSubject = new BehaviorSubject<GamificationProfile | null>(null);
  profile$ = this.profileSubject.asObservable();
  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<GamificationProfile[]> {
    return this.http.get<GamificationProfile[]>(`${this.baseUrl}/leaderboard`);
  }

  getGamificationByUser(id: number): Observable<GamificationProfile> {
    return this.http.get<GamificationProfile>(`${this.baseUrl}/getbadge/${id}`);
  }

  updateProfile(userId: number): void {
    this.getGamificationByUser(userId)
      .pipe(tap(profile => this.profileSubject.next(profile)))
      .subscribe(); 
  }
}
