import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'TimeManagment';
  ngOnInit() {
    const token = localStorage.getItem('token');
    console.log('Token au démarrage de l\'app :', token); // 🔥 ici
  }
}
