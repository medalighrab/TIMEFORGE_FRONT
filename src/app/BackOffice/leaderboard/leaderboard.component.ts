import { Component, OnInit } from '@angular/core';
import { GamificationProfile, GamificationService } from 'src/app/services/gamification.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: GamificationProfile[] = [];

  constructor(private gamificationService: GamificationService) {}

  ngOnInit(): void {
    this.gamificationService.getLeaderboard().subscribe(data => {
      this.leaderboard = data;
    });
  }
}
