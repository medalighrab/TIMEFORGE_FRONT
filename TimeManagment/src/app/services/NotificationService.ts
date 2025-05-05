import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:8089/api/notifications'; // Mettez ici l'URL de votre API Spring

  constructor(private http: HttpClient) { }

  // Récupérer les notifications des projets
  getProjectNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-project-notifications`).pipe(
        tap(data => {
          console.log('Notification data received:', data);
        })
      );
  }

  // Optionnel : récupérer les notifications non lues
  getUnreadNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-unread-notifications`);
  }

  // Marquer une notification comme lue
  markNotificationAsRead(notificationId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mark-as-read`, notificationId);
  }
}
