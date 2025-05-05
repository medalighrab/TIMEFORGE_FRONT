import { Component, OnInit } from '@angular/core';
import { GamificationProfile, GamificationService } from '../services/gamification.service';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-gamification-badge',
  templateUrl: './gamification-badge.component.html',
  styleUrls: ['./gamification-badge.component.css']
})
export class GamificationBadgeComponent implements OnInit {
  gamificationProfile!: GamificationProfile;
isNaN: any;

  constructor(private gamificationService: GamificationService,private userService:UsersService,private authService: AuthService) {}
username:any;
ngOnInit(): void {
  this.username = this.authService.getUsernameFromToken();

  this.userService.getUser(this.username).pipe(
    tap((user: any) => this.gamificationService.updateProfile(user.idUser)),
    switchMap(() => this.gamificationService.profile$)
  ).subscribe((profile) => {
    if (profile) this.gamificationProfile = profile;
  });
}


  getBadgeImage(level: number): string {
    switch (level) {
      case 1: return 'assets/one.png';
      case 2: return 'assets/two.png';
      case 3: return 'assets/three.png';
      case 4: return 'assets/rewards.png';
      case 5: return 'assets/five.png';
      case 6: return 'assets/medal.png';
      default: return 'assets/one.png';
    }
  }
}