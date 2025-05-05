import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GamificationProfile, GamificationService } from 'src/app/services/gamification.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gamificationProfile!: GamificationProfile;

  constructor(private gamificationService: GamificationService,private userService:UsersService,private authService: AuthService) {}
username:any;
ngOnInit(): void {
  this.username = this.authService.getUsernameFromToken();

  this.userService.getUser(this.username).subscribe((data: any) => {
    this.gamificationService.profile$.subscribe((profile) => {
      if (profile) this.gamificationProfile = profile;
    });

    this.gamificationService.updateProfile(data.idUser); 
  });
}

  getProgressPercentage(): number {
    const level = this.gamificationProfile?.level || 1;
    const xp = this.gamificationProfile?.xp || 0;
    const xpNeeded = level * 100;
    return Math.min(100, Math.floor((xp / xpNeeded) * 100));
  }
}