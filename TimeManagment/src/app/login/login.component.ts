import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   {
  isSignIn: boolean = true;
  isForgotPassword: boolean = false;
  errorMessage: string = '';
  message: string = '';
  resetEmail: string = '';

  // Login properties
  loginData = {
    mail: '',
    password: ''
  };

  // Register properties
  registerData = {
    username: '',
    name: '',
    cin: '',
    password: '',
    confirmPassword: ''
  };

  registerErrors = {
    username: '',
    name: '',
    cin: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  toggle(): void {
    this.isSignIn = !this.isSignIn;
    this.clearErrors();
  }

  showForgotPassword(): void {
    this.isForgotPassword = true;
    this.clearErrors();
  }

  clearErrors(): void {
    this.errorMessage = '';
    this.registerErrors = {
      username: '',
      name: '',
      cin: '',
      password: '',
      confirmPassword: ''
    };
  }

  validateRegister(): boolean {
    let isValid = true;

    // Validate username
    if (!this.registerData.username) {
      this.registerErrors.username = 'Username is required';
      isValid = false;
    } else if (this.registerData.username.length < 3) {
      this.registerErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    } else {
      this.registerErrors.username = '';
    }

    // Validate name
    if (!this.registerData.name) {
      this.registerErrors.name = 'Name is required';
      isValid = false;
    } else {
      this.registerErrors.name = '';
    }

    // Validate CIN
    const cinRegex = /^\d{8}$/;
    if (!this.registerData.cin) {
      this.registerErrors.cin = 'CIN is required';
      isValid = false;
    } else if (!cinRegex.test(this.registerData.cin)) {
      this.registerErrors.cin = 'CIN must be 8 digits';
      isValid = false;
    } else {
      this.registerErrors.cin = '';
    }

    // Validate password
    if (!this.registerData.password) {
      this.registerErrors.password = 'Password is required';
      isValid = false;
    } else if (this.registerData.password.length < 6) {
      this.registerErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    } else {
      this.registerErrors.password = '';
    }

    // Validate confirm password
    if (!this.registerData.confirmPassword) {
      this.registerErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (this.registerData.password !== this.registerData.confirmPassword) {
      this.registerErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    } else {
      this.registerErrors.confirmPassword = '';
    }

    return isValid;
  }
  navigateToFaceId() {
    this.router.navigate(['/face_id']);
  }
  onLogin(): void {
    if (!this.loginData.mail || !this.loginData.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }
  
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        if (response?.accessToken) {  // Vérifiez maintenant accessToken au lieu de token
          this.authService.saveToken(response.accessToken);  // Sauvegardez accessToken
          
          // Redirection basée sur le rôle
          if (response.role === 'ROLE_EMPLOYEE') {
            this.router.navigate(['/A']);
          } else if (response.role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else if (response.role === 'ROLE_TEAMLEAD') {
            this.router.navigate(['/A']);
          }
        } else {
          console.error('No accessToken in response:', response);
          this.errorMessage = 'Authentication failed - no token received';
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  onRegister(): void {
    if (!this.validateRegister()) return;

    const { username, name, cin, password } = this.registerData;
    this.authService.register({ username, name, cin, password }).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.isSignIn = true;
        this.clearForm();
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.error || 'Registration failed. Please try again.';
      }
    });
  }

  onForgotPassword(): void {
    if (!this.resetEmail) {
      this.message = 'Email is required';
      return;
    }

    // Ici vous appelleriez normalement votre service de réinitialisation
    this.message = 'Password reset link has been sent to your email';
    setTimeout(() => {
      this.isForgotPassword = false;
      this.message = '';
    }, 3000);
  }

  clearForm(): void {
    this.loginData = { mail: '', password: '' };
    this.registerData = {
      username: '',
      name: '',
      cin: '',
      password: '',
      confirmPassword: ''
    };
    this.resetEmail = '';
    this.clearErrors();
  }
}