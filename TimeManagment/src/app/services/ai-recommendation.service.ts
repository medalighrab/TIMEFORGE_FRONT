import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AIRecommendationService {

  private apiUrl = 'http://localhost:8089/api/ai/recommend';

  constructor(private http: HttpClient) {}

  recommendTechnique(text: string): Observable<string> {
    const body = { text };
    return this.http.post(this.apiUrl, body, { responseType: 'text' });
  }
}
