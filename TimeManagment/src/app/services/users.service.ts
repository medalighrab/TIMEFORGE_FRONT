import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 private apiUrl = 'http://localhost:8089/users';
  constructor(private http: HttpClient) {}

  getUser(username: string) {
    return this.http.get<any>(`${this.apiUrl}/user/${username}`);
  }
  
  getUserDetailsByUsername(username: string): Observable<any> {
    return this.http.get(`http://localhost:8089/api/users/${username}`);
  }
}
