import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.saveToken(res.accessToken);
        if (res.role === 'ROLE_ADMIN') {
         window.location.href ='/admin/tasks';
        }else if (res.role === 'ROLE_EMPLOYEE') {
         window.location.href ='/task';
        }
        else if (res.role === 'ROLE_TEAMLEAD') {
         window.location.href ='/admin/tasks';
        }
       
        console.log(res);        
      },
      error: () => {
        this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
      }
    });
  }
}
