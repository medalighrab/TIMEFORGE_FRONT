import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { UINotification } from 'src/app/models/ui-notification';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.css']
})
export class NotificationBellComponent implements OnInit {
  notifications: UINotification[] = [];
  dropdownVisible = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe(notifs => {
      this.notifications = notifs;
    });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
