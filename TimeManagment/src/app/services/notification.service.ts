// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UINotification } from '../models/ui-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: UINotification[] = [];
  private notificationSubject = new BehaviorSubject<UINotification[]>([]);

  notification$ = this.notificationSubject.asObservable();

  public showNotification(title: string, body: string) {
    const notification: UINotification = {
      title,
      body,
      timestamp: new Date()
    };

    this.notifications.unshift(notification);
    this.notificationSubject.next(this.notifications);
  }
}
