import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: any[] = []; 
  isDrawerOpen = false;
  selectedTask: any = null;

  title: string = '';
  description: string = '';
  starDate: Date | null = null;
  endDate: Date | null = null;
  statusGoal: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' = 'NOT_STARTED';

  constructor(private taskService:TaskService){

  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.TaskList().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  openDrawer(task: any): void {
    this.selectedTask = task;
    this.isDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    this.title = '';
    this.description = '';
  }

  assignGoal(): void {
    if (!this.title?.trim() || !this.description?.trim() || !this.starDate || !this.endDate || !this.statusGoal) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "All fields are required!",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
  
    const goalData = {
      title: this.title,
      description: this.description,
      starDate: this.starDate,
      endDate: this.endDate,
     
    };
  
    this.taskService.addGoalandassigntotask(goalData, this.selectedTask.id).subscribe(
      (response) => {
        console.log('Goal assigned successfully:', response);
        
        // SweetAlert2 success message
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
  
        this.closeDrawer();
        this.getTasks(); // Refresh task list after assignment
      },
      (error) => {
        console.error('Error assigning goal:', error);
        
        // SweetAlert2 error message
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "There was an error assigning the goal",
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
  
}