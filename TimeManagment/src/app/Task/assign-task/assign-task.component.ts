import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from 'src/app/services/my-service.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html'
})
export class AssignTaskComponent implements OnInit {
  taskForm!: FormGroup;

  // exemple : remplacer avec des valeurs dynamiques plus tard
  selectedUserId: number = 2;
  selectedProjectId: number = 3;

  constructor(
    private fb: FormBuilder,
    private taskService: MyServiceService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['TODO', Validators.required],
      startDate: ['', Validators.required],
      deadline: ['', Validators.required],
      durationInDays: [0, Validators.required],
      updatedAt: ['', Validators.required],
      estimatedHours: [0, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;

      this.taskService.addAndAssignTask(task, this.selectedUserId, this.selectedProjectId)
        .subscribe({
          next: (res) => {
            console.log('Tâche ajoutée et affectée avec succès :', res);
            this.taskForm.reset();
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout de la tâche :', err);
          }
        });
    }
  }
}