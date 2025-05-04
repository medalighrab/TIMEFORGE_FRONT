import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Project } from 'src/app/models/Projet';
import { Task } from 'src/app/models/Task';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
  projects: any[] = [];

  taskToEditId: number | null = null;
  showTasks: { [key: number]: boolean } = {};
  showTaskForm: { [key: number]: boolean } = {}; 
  taskForm!: FormGroup;
  taskToEdit?: any;
  isEdit = false;
  employees: any[] = [];
  tasks: Task[] = [];
  selectedEmployeeId: number | null = null;
  constructor(private fb: FormBuilder, private authService: AuthService ,private taskService: TaskService ,private userService: UsersService) {}
  user:any
  username:any
  ngOnInit(): void {
    this.username= this.authService.getUsernameFromToken();

    this.userService.getUser(this.username).subscribe((data)=>{
      this.user=data;
      console.log(this.user.idUser);
      this.loadProjects();
      this.loadUsers();
    }
    )
    this.taskForm = this.fb.group({
      name: [this.taskToEdit?.name || '', Validators.required],
      description: [this.taskToEdit?.description || '', Validators.required],
      status: [this.taskToEdit?.status || 'TODO', Validators.required],
      priority: [this.taskToEdit?.priority || 1],
      startDate: [this.taskToEdit?.startDate || '', Validators.required],
      deadline: [this.taskToEdit?.deadline || '', Validators.required]
    });

  }



  loadProjects() {
    this.taskService.getallprojetByuser(this.user.idUser).subscribe((data:any[]) => {
   console.log(data);
   
      this.projects = data;
   
      
    });
  }

  loadUsers() {
    this.taskService.getallUsers().subscribe((data) => {
      this.employees = data;
      console.log(this.employees);
      
    });
  }
  onEmployeeChange(event: any) {
    const selectedId = event.target.value;
    this.selectedEmployeeId = selectedId !== '0' ? +selectedId : null;
    console.log(this.selectedEmployeeId);
  }
  onSubmit(projectId: number) {
    const task = this.taskForm.value;
  
    if (this.isEdit && this.taskToEditId !== null) {
      task.id = this.taskToEditId; 
      this.updateTask(task); 
      this.toggleTaskForm(projectId);
    } else {
      this.taskService.addTask(task, projectId,this.selectedEmployeeId!,this.user.idUser).subscribe(() => {
        this.loadProjects();
        this.toggleTaskForm(projectId);
      });
    }
  }
  

toggleTaskForm(projectId: number) {
  this.showTaskForm[projectId] = !this.showTaskForm[projectId];
  this.taskForm.reset({
    status: 'TODO',
    // priority: 1
  });
  this.taskToEditId = null;
  this.isEdit = false;
}
  editTask(task: any, projectId: number) {
    this.taskForm.patchValue(task);
    this.taskToEditId = task.id;
    this.isEdit = true;
    this.showTaskForm[projectId] = true;
  }
  
  deleteTask(taskId: number, projectId: number) {
    if (confirm('Supprimer cette tâche ?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.loadProjects();
      });
    }
}

toggleTasks(projectId: number) {
  this.showTasks[projectId] = !this.showTasks[projectId];
}
updateTask(task: any) {
    this.taskService.updateTask(task.id,task).subscribe(() => {
      this.loadProjects();
    });
}
}
