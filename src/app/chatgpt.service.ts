import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  private apiUrl = 'http://localhost:8089/api/goals/ask-gpt';

  constructor(private http: HttpClient) {}

  askQuestion(question: string) {
    return this.http.post(this.apiUrl, { question });
  }
}