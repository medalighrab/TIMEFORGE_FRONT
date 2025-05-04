import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
  reminders: any[] = []; 
  showDropdown = false; 

  constructor(private http: HttpClient,private authService:AuthService) { }
  isLogged:boolean = false;

  ngOnInit(): void {
    
      this.isLogged= this.authService.isLoggedIn();
    
    this.getReminders();
  }
  logout(){
    this.showDropdown = false;
    window.location.href="/"
    this.authService.logout();
  }
    getReminders(): void {
      this.http.get<any[]>('http://localhost:8089/api/strategic-reminders/reminders').subscribe(
        (data) => {
          this.reminders = data; 
        },
        (error) => {
          console.error('Error fetching reminders:', error);
        }
      );
    }
  
    toggleDropdown(): void {
      this.showDropdown = !this.showDropdown;
    }

}
