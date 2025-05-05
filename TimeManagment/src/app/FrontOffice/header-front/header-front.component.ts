import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HealthReminderService } from 'src/app/FrontOffice/service/health-reminder.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent implements OnInit {
  reminders: any[] = [];
  Healthreminders: any[] = [];
  combinedReminders: any[] = [];
  userId: number = 0;
  token: string = '';

  showDropdown: boolean = false;
  showNotification: boolean = false;
  newNotificationCount: number = 0;

  isLogged: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private HealthReminder: HealthReminderService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
    this.getReminders();
    this.HealthremindersList();
    this.loadNotificationCount();
    this.retrieveUserIdFromToken();

  }

  logout(): void {
    this.showDropdown = false;
    this.authService.logout();
    window.location.href = '/';
  }

  getReminders(): void {
    this.http.get<any[]>('http://localhost:8089/api/strategic-reminders/reminders').subscribe(
      (data) => {
        this.reminders = data;
        this.combineReminders();
      },
      (error) => {
        console.error('Error fetching reminders:', error);
      }
    );
  }

  deleteReminder(reminderId: number): void {
    this.http.delete(`http://localhost:8089/api/strategic-reminders/reminders/${reminderId}`)
      .subscribe(
        () => {
          this.reminders = this.reminders.filter(reminder => reminder.id !== reminderId);
          this.combineReminders();
        },
        (error) => {
          console.error('Error deleting reminder:', error);
        }
      );
  }

  HealthremindersList(): void {
    this.HealthReminder.getAll().subscribe(response => {
      this.Healthreminders = response;
      this.combineReminders();
      console.log('Health Reminders list', response);

      this.updateNotificationCount(response.length);
    });
  }

  combineReminders(): void {
    const remindersWithSource = this.reminders.map(r => ({ ...r, source: 'reminder' }));
    const healthRemindersWithSource = this.Healthreminders.map(r => ({ ...r, source: 'healthReminder' }));
    this.combinedReminders = [...remindersWithSource, ...healthRemindersWithSource];
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  toggleNotification(): void {
    this.showNotification = !this.showNotification;

    if (this.showNotification) {
      this.resetNotificationCount();
    }
  }

  closeNotification(event: Event): void {
    event.stopPropagation();
    this.showNotification = false;
  }

  loadNotificationCount(): void {
    const count = localStorage.getItem('newNotificationCount');
    this.newNotificationCount = count ? parseInt(count, 10) : 0;
  }

  updateNotificationCount(count: number): void {
    this.newNotificationCount = count;
    localStorage.setItem('newNotificationCount', count.toString());
  }

  resetNotificationCount(): void {
    this.newNotificationCount = 0;
    localStorage.setItem('newNotificationCount', '0');
  }

  retrieveUserIdFromToken(): void {
    this.token = localStorage.getItem('token') || '';
  
    if (this.token) {
      this.authService.getUserIdFromtoken(this.token).subscribe({
        next: (response) => {
          // Backend returns a plain number (not an object)
          if (typeof response === 'number') {
            this.userId = response;
            console.log('✅ User ID retrieved (as number):', this.userId);
          } else if (response && response.id) {
            this.userId = response.id;
            console.log('✅ User ID retrieved (as object):', this.userId);
          } else {
            console.warn('⚠️ Token valid but unexpected response format:', response);
          }
        },
        error: (error) => {
          console.error('❌ Error retrieving user from token:', error);
        }
      });
    } else {
      console.warn('⚠️ No token found in localStorage.');
    }
  }
  
}
