import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MyServiceService } from 'src/app/services/my-service.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent implements OnInit {
  projectNotifications: any[] = [];
  showDropdown = false;
  isLogged = false;

  constructor(
    private myService: MyServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLogged = status;
      if (status) {
        this.loadUpcomingDeadlines();
      }
    });
  }

  loadUpcomingDeadlines(): void {
    this.myService.getUpcomingDeadlines().subscribe(
      (data) => {
        this.projectNotifications = data;
        console.log('Upcoming project deadlines:', this.projectNotifications);
      },
      (error) => {
        console.error('Error fetching upcoming deadlines:', error);
      }
    );
  }

  logout(): void {
    this.showDropdown = false;
    this.authService.logout();
    window.location.href = '/';
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
