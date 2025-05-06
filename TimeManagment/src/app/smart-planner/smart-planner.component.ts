import { Component } from '@angular/core';
import { SmartPlannerService, SessionPlan } from 'src/app/services/smart-planner.service';

@Component({
  selector: 'app-smart-planner',
  templateUrl: './smart-planner.component.html',
  styleUrls: ['./smart-planner.component.css']
})
export class SmartPlannerComponent {

  sessionPlans: SessionPlan[] = [];
  loading: boolean = false;

  constructor(private smartPlannerService: SmartPlannerService) {}

  generate() {
    this.loading = true;
    this.smartPlannerService.generatePlan().subscribe(data => {
      this.sessionPlans = data;
      this.loading = false;
    }, error => {
      console.error('Erreur lors de la génération', error);
      this.loading = false;
    });
  }
}
