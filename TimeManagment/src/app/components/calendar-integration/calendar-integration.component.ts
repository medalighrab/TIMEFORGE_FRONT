import { Component, OnInit } from '@angular/core';
import { CalendarIntegrationService } from 'src/app/services/calendar-integration.service';
import { CalendarIntegration } from 'src/app/models/calendar-integration';

@Component({
  selector: 'app-calendar-integration',
  templateUrl: './calendar-integration.component.html',
  styleUrls: ['./calendar-integration.component.css']
})
export class CalendarIntegrationComponent implements OnInit {
  events: CalendarIntegration[] = [];
  form: CalendarIntegration = {
    eventTitle: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    location: '',
    description: ''
  };
  editingId: number | null = null;

  constructor(private calendarService: CalendarIntegrationService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.calendarService.getAll().subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error('Erreur lors du chargement des événements', err)
    });
  }

  save(): void {
    if (!this.form.eventTitle || !this.form.eventDate || !this.form.startTime || !this.form.endTime || !this.form.location) {
      alert('⚠️ Merci de remplir tous les champs obligatoires.');
      return;
    }

    const eventToSend: CalendarIntegration = {
      ...this.form,
      startTime: this.form.startTime.length === 5 ? this.form.startTime + ':00' : this.form.startTime, // 🔥
      endTime: this.form.endTime.length === 5 ? this.form.endTime + ':00' : this.form.endTime           // 🔥
    };

    if (this.editingId) {
      this.calendarService.update(this.editingId, eventToSend).subscribe({
        next: () => {
          this.load();
          this.cancel();
        },
        error: (err) => console.error('Erreur lors de la mise à jour', err)
      });
    } else {
      this.calendarService.create(eventToSend).subscribe({
        next: () => {
          this.load();
          this.resetForm();
        },
        error: (err) => console.error('Erreur lors de la création', err)
      });
    }
  }

  edit(event: CalendarIntegration): void {
    this.form = { ...event };
    this.editingId = event.id || null;
  }

  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.calendarService.delete(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  resetForm(): void {
    this.form = {
      eventTitle: '',
      eventDate: '',
      startTime: '',
      endTime: '',
      location: '',
      description: ''
    };
  }

  cancel(): void {
    this.editingId = null;
    this.resetForm();
  }
  autoPlan() {
    this.calendarService.autoPlan().subscribe(data => {
      this.load(); // Recharge la liste après planification
      alert('✅ Planification intelligente terminée !');
    });
  }
  
}
