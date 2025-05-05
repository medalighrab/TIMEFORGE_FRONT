import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private apiUrl = 'http://localhost:8089/api/goals';
  private translationApiUrl = 'http://localhost:8089/api/translate';

  constructor(private http: HttpClient) {}

  getAllGoals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getgoalbytaskid(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/taksbygoals`);
  }

  GoalActivChronics(id: any, active: boolean): Observable<any> {
    return this.http.put<any>(`http://localhost:8089/api/health-reminders/${id}/chronic/${active}`, null);
  }

  translateGoalText(text: string, fromLang: string = 'en', toLang: string = 'fr'): Observable<string> {
    const body = { text, from: fromLang, to: toLang };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.translationApiUrl, body, { headers }).pipe(
      map(response => {
        if (typeof response === 'object' && response.translatedText) {
          return response.translatedText;
        }

        if (Array.isArray(response) && response.length > 0 && response[0]?.translations?.[0]?.text) {
          return response[0].translations[0].text;
        }

        if (typeof response === 'object' && response.text) {
          return response.text;
        }

        throw new Error('Format de réponse inconnu : ' + JSON.stringify(response));
      }),
      catchError(error => {
        console.error('Erreur dans la traduction :', error);
        return of('Erreur lors de la traduction.');
      })
    );
  }

  getNewGoalData(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/new-data`);
  }

  predictNextGoal(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/predict`);
  }

  saveGoal(goal: any): Observable<any> {
    return this.http.post(this.apiUrl, goal);
  }

  getCompletedGoals(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/completed/${userId}`);
  }

  getUserScore(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/${userId}/score`);
  }
  downloadGoalReport(goalId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${goalId}/report`, {
      responseType: 'blob'
    });
  }
  
}
