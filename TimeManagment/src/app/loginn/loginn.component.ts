
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { AuthService } from '../services/auth.service'; // <-- Import ici !!

@Component({
  selector: 'app-loginn',
  templateUrl: './loginn.component.html',
  styleUrls: ['./loginn.component.css']
})
export class LoginnComponent {
  trigger: Subject<void> = new Subject<void>();
  webcamImage: WebcamImage | null = null;
  resultMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  
    this.http.post('http://127.0.0.1:5000/verify-face', {
      image: webcamImage.imageAsDataUrl
    }).subscribe((res: any) => {
      this.resultMessage = res.verified ? "✅ Face Verified!" : "❌ Verification Failed";
  
      if (res.verified) {
        const credentials = {
          mail: 'TEAMLEAD1@gmail.com',
          password: 'TEAMLEAD1' 
        };
  
        this.authService.login(credentials).subscribe({
          next: (response) => {
            if (response?.accessToken) {
              this.authService.saveToken(response.accessToken);
  
              if (response.role === 'ROLE_EMPLOYEE') {
                this.router.navigate(['/A']);
              } else if (response.role === 'ROLE_TEAMLEAD') {
                this.router.navigate(['/A']);
              } else {
                this.router.navigate(['/A']);
              }
            } else {
              console.error('No accessToken in response:', response);
              this.resultMessage = 'Authentication failed - no token received';
            }
          },
          error: (error) => {
            console.error('Login error:', error);
            this.resultMessage = error.error?.message || 'Login failed. Please try again.';
          }
        });
      }
    }, error => {
      this.resultMessage = "❌ Error during verification.";
    });
  }
  

    // ✅ Navigation vers Login
  navigateToLogin() {
    this.router.navigate(['/login']); // Assure-toi que ta route login est bien '/login'
  }
  
}
