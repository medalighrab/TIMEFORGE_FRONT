import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, Observable, tap } from 'rxjs';

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

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.loggedIn.asObservable(); // observable à utiliser dans les composants

  constructor(private http: HttpClient) {}
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Token reçu:', response.token);
        // ⚠️ Ici : tu dois bien stocker dans localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
      })
    );
  }
  

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
  }

  saveToken(token: string): void {
    console.log('📦 Token sauvegardé :', token);
    localStorage.setItem('token', token);
    this.loggedIn.next(true); // ✅ notifier que l’utilisateur est connecté
  }

  getToken(): string | null {
    return localStorage.getItem('token');
    
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // ✅ notifier que l’utilisateur est déconnecté
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
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
}
