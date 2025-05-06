import { Component, OnInit } from '@angular/core';
import { HealthReminderService, HealthReminder } from '../service/health-reminder.service';


@Component({
  selector: 'app-health-reminder',
  templateUrl: './health-reminder.component.html',
  styleUrls: ['./health-reminder.component.css']
})
export class HealthReminderComponent implements OnInit {
  healthReminders: HealthReminder[] = [];
  newReminder: HealthReminder = { typeReminder: 'HELTHBREAKS' }; // Valeur par défaut

  constructor(private reminderService: HealthReminderService) {}

  ngOnInit(): void {
    this.loadReminders();
  }

  loadReminders(): void {
    this.reminderService.getAll().subscribe((data) => {
      this.healthReminders = data;
    });
  }

  addReminder(): void {
    if (this.newReminder) {
      this.reminderService.add(this.newReminder).subscribe(() => {
        this.loadReminders();
        this.newReminder = { typeReminder: 'HELTHBREAKS' }; // Réinitialiser après ajout
      });
    }
  }

  deleteReminder(id: number): void {
    this.reminderService.delete(id).subscribe(() => this.loadReminders());
  }
}
