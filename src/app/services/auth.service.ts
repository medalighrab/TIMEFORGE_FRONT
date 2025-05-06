import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export interface RegisterRequest {
  username: string;
  mail: string;
  cin: string;
  password: string;
  role?: string; 
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8089/auth'; 

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data,{responseType: 'text'});
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub || null;
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      return null;
    }
  }

  getRolesFromToken(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      return decoded.roles || []; 
    } catch (error) {
      console.error('Erreur lors du décodage des rôles :', error);
      return [];
    }
  }

  getUserIdFromtoken (token: string): Observable<any> {
    const url = `http://localhost:8089/users/api/user`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

   
 
    return this.http.get<any>(url, { headers });
  } 
}
