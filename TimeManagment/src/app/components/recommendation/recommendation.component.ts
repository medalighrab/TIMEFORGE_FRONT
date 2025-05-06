import { Component } from '@angular/core';
import { AIRecommendationService } from 'src/app/services/ai-recommendation.service';
import { NotificationService } from 'src/app/services/notification.service';


interface Recommendation {
  recommendation: string;
  description: string;
  durationSuggestion: string;
  benefits: string[];
}

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent {

  userInput: string = '';
  recommendation: Recommendation | null = null;

  constructor(private aiService: AIRecommendationService,private notificationService: NotificationService
  ) {}

  getRecommendation() {
    if (this.userInput.trim() !== '') {
      this.aiService.recommendTechnique(this.userInput).subscribe(result => {
        try {
          this.recommendation = JSON.parse(result) as Recommendation;
  
          // 🧠 Afficher la notification automatiquement
          this.notificationService.showNotification(
            '🧠 Technique Recommandée',
            `Essayez : ${this.recommendation.recommendation}`
          );
  
        } catch (error) {
          console.error('Error parsing recommendation:', error);
        }
      });
    }
  }
  
  
}
