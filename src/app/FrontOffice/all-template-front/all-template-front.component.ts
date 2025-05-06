import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-template-front',
  templateUrl: './all-template-front.component.html',
  styleUrls: ['./all-template-front.component.css']
})
export class AllTemplateFrontComponent implements OnInit {
  ngOnInit(): void {
    this.isLogged= this.authService.isLoggedIn();
  }
  constructor(private authService:AuthService) { }
  isLogged: boolean = false;  
}
