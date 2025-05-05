import { ChangeDetectionStrategy } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { Task } from 'src/app/models/Task';
import { AuthService } from 'src/app/services/auth.service';
import { GamificationService } from 'src/app/services/gamification.service';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-taskemployee',
  templateUrl: './taskemployee.component.html',
  styleUrls: ['./taskemployee.component.css']
})
export class TaskemployeeComponent implements OnInit {
  tasks: any[] = [];
  taskForm!: FormGroup;
  username: any;
  filters = {
    name: '',
    description: '',
    startDate: '',
    deadline: '',
    status: ''
  };
  user:any
  



  constructor(private fb: FormBuilder, 
    private authService: AuthService ,
    private taskService: TaskService ,
    private cdr: ChangeDetectorRef,
    private gamificationService: GamificationService,
    private userService: UsersService) {}
  ngOnInit(): void {
    this.username= this.authService.getUsernameFromToken();
    this.showPauseNotification()
   
    this.userService.getUser(this.username).subscribe((data)=>{
      this.user=data;
      console.log(this.user.idUser);
      this.getTaskbyuser();
      this.getTasks()
    }
    )
  
    this.taskForm = this.fb.group({
      status: ['', Validators.required],
      id: ['', Validators.required],
    });
  }
  showPauseNotification() {
    const hasDismissed = localStorage.getItem('pauseReminderDismissed');
    
    if (hasDismissed === 'true') {
      return;
    }

   setInterval(()=>{
    Swal.fire({
      icon: 'info',
      title: 'Prenez une pause !',
      text: 'Il est temps de faire une petite pause, respirez et détendez-vous.',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Rappeler plus tard',
      timer: 5000, 
      showConfirmButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Rappelé plus tard');
        setTimeout(() => {
          this.showPauseNotification();
        }, 1800000); 
      } else if (result.isDismissed) {
        console.log('Notification annulée');
        localStorage.setItem('pauseReminderDismissed', 'true');
      }
    });
   },300000)
  }


getTaskbyuser(){
  this.taskService.getallTaskByuser(this.user.idUser).subscribe((data: any[]) => {
    this.tasks = data;
    console.log(data);
  }
  )
}
clearFilters() {
  this.filters = {
    name: '',
    description: '',
    startDate: '',
    deadline: '',
    status: ''
  };
  this.getTaskbyuser()
}

getTasks() {
  this.taskService.getTasks(this.filters).subscribe((data) => {
    this.tasks = data;
    console.log(data);
   
  },(error)=>{
    console.error(error);
    
  });
}


  openEditModal(task: any) {
    this.taskForm.patchValue({
      status: task.status,
      id: task.id,
    });
   
  }
  onSubmitFilter() {
    this.getTasks();
  }
  onSubmit(): void {
    if (this.taskForm.invalid) return;
    console.log(this.taskForm.value);
    
    this.taskService.updateTaskstatus(this.taskForm.value.id,this.taskForm.value).subscribe((data) => {
      
      console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Status Updated Successfully',
          text: 'The Status has been Updated successfully!',
          timer: 2000, 
          showConfirmButton: false
        });
        this.gamificationService.updateProfile(this.user.idUser);
        this.taskForm.reset();
      this.clearFilters()
    });
  }

  archiveTask(task: Task) {
    this.taskService.archiveTask(task.id!, !task.isdeleted).subscribe(() => {
      this.clearFilters();
      this.cdr.detectChanges(); 
      this.getTaskbyuser(); 
    });
  }
  

}

