import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-taskemployee',
  templateUrl: './taskemployee.component.html',
  styleUrls: ['./taskemployee.component.css']
})
export class TaskemployeeComponent implements OnInit {
  tasks: any[] = [];
  taskForm!: FormGroup;
  username: any;
  user:any
  constructor(private fb: FormBuilder, private authService: AuthService ,private taskService: TaskService ,private userService: UsersService) {}
  ngOnInit(): void {
    this.username= this.authService.getUsernameFromToken();
  
    this.userService.getUser(this.username).subscribe((data)=>{
      this.user=data;
      console.log(this.user.idUser);
      this.getTaskbyuser(this.user.idUser);
    }
    )

    this.taskForm = this.fb.group({
      status: ['', Validators.required],
      id: ['', Validators.required],
    });
  }


getTaskbyuser(id:any){
  this.taskService.getallTaskByuser(id).subscribe((data: any[]) => {
    this.tasks = data;
    console.log(data);
  }
  )
}

  openEditModal(task: any) {
    this.taskForm.patchValue({
      status: task.status,
      id: task.id,
    });
   
  }
  onSubmit(): void {
    if (this.taskForm.invalid) return;
    console.log(this.taskForm.value);
    
    this.taskService.updateTaskstatus(this.taskForm.value.id,this.taskForm.value).subscribe(() => {
      alert('Tâche mise à jour');
      this.getTaskbyuser(this.user.idUser);
    });
  }
}

