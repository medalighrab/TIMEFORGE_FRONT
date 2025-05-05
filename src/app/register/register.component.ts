import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    cin: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit(): void {
    if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      alert('Form invalid or passwords do not match');
      return;
    }
    const { username, name, cin, password } = this.registerForm.value;
    this.authService.register({ username, name, cin, password }).subscribe({
      next: (res) => {
        alert('Registration successful');
        this.registerForm.reset();
       
        
      },
      error: (err) => {
        alert("Registration failed");
        console.error(err); 
      }
    });
  }
}
