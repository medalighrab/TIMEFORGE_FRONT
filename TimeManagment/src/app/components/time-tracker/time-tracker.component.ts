import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeTrackerService } from 'src/app/services/time-tracker.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TimeTracker } from 'src/app/models/time-tracker';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css']
})
export class TimeTrackerComponent implements OnInit {
  trackers: TimeTracker[] = [];
  form: TimeTracker = {
    title: '',
    description: '',
    estimatedMinutes: 0,
    completed: false,
    startTime: '',
    priority: ''
  };
  editingId: number | null = null;

  constructor(
    private trackerService: TimeTrackerService,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.trackerService.getAll().subscribe(data => this.trackers = data);
  }

  save() {
    if (this.editingId) {
      this.trackerService.update(this.editingId, this.form).subscribe(() => {
        this.load();
        this.cancel();
      });
    } else {
      this.trackerService.create(this.form).subscribe(() => {
        this.load();
        this.resetForm();
      });
    }
  }

  edit(tracker: TimeTracker) {
    this.form = { ...tracker };
    this.editingId = tracker.id || null;
  }

  delete(id: number) {
    this.trackerService.delete(id).subscribe(() => this.load());
  }

  resetForm() {
    this.form = {
      title: '',
      description: '',
      estimatedMinutes: 0,
      completed: false,
      startTime: '',
      priority: ''
    };
  }

  cancel() {
    this.editingId = null;
    this.resetForm();
  }

  schedule() {
    this.trackerService.schedule(this.form).subscribe(() => {
      this.load();
      this.resetForm();
    });
  }
  

  // ✅ Analyse IA du risque avec notification
  analyzeRisk() {
    this.http.post<number>('http://localhost:8089/api/ai/session-risk', this.form)
      .subscribe(risk => {
        const percent = (risk * 100).toFixed(0);
        console.log('🧠 Risque IA reçu :', percent + '%');

        const currentHour = this.form.startTime
          ? parseInt(this.form.startTime.split(':')[0])
          : 0;

        if (risk > 0.5) {
          const newHour = currentHour > 18 ? '10:00' : '08:00';

          this.notificationService.showNotification(
            '⚠️ Session Risquée',
            `Risque estimé : ${percent}%. Essayez plutôt à ${newHour}.`
          );
        } else {
          this.notificationService.showNotification(
            '✅ Session OK',
            `Risque estimé : ${percent}%`
          );
        }
      }, error => {
        console.error('Erreur IA :', error);
      });
  }
}
