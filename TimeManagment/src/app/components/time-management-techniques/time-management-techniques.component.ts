import { Component, OnInit } from '@angular/core';
import { TimeManagementTechniquesService } from 'src/app/services/time-management-techniques.service';
import { TimeManagementTechniques } from 'src/app/models/time-management-techniques';

@Component({
  selector: 'app-time-management-techniques',
  templateUrl: './time-management-techniques.component.html',
  styleUrls: ['./time-management-techniques.component.css']  // ✅ ici comme tu veux
})
export class TimeManagementTechniquesComponent implements OnInit {
  techniques: TimeManagementTechniques[] = [];
  form: TimeManagementTechniques = { name: '', description: '' };
  editingId: number | null = null;

  constructor(private service: TimeManagementTechniquesService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => this.techniques = data);
  }

  save() {
    if (this.editingId) {
      this.service.update(this.editingId, this.form).subscribe(() => {
        this.load();
        this.cancel();
      });
    } else {
      this.service.create(this.form).subscribe(() => {
        this.load();
        this.resetForm();
      });
    }
  }

  edit(t: TimeManagementTechniques) {
    this.form = { ...t };
    this.editingId = t.id || null;
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }

  resetForm() {
    this.form = { name: '', description: '' };
  }

  cancel() {
    this.editingId = null;
    this.resetForm();
  }
}
