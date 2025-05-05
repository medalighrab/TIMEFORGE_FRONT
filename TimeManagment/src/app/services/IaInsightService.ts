import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IaInsightService {

  private flaskApiUrl = 'http://127.0.0.1:5000/project-insights';  // 👈 Modifie si nécessaire

  constructor(private http: HttpClient) { }

  analyzeComments(comments: string[]): Observable<any> {
    const body = {
      comments: comments.map(text => ({ text }))
    };
    console.log('➡️ Envoi à Flask IA:', body);
    return this.http.post<any>(this.flaskApiUrl, body);
  }
}
