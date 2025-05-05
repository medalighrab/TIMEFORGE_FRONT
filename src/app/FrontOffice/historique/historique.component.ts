import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  tasks: any[] = [];
  taskForm!: FormGroup;
  username: any;

  user:any
  

    public chart: any;


  constructor(private fb: FormBuilder, 
    private authService: AuthService ,
    private taskService: TaskService ,
    private cdr: ChangeDetectorRef,
    private userService: UsersService) {}
  ngOnInit(): void {
    this.username= this.authService.getUsernameFromToken();
   
    this.userService.getUser(this.username).subscribe((data)=>{
      this.user=data;
      console.log(this.user.idUser);
      this.getTaskbyhistory();
    }
    )
  
  
  }
getTaskbyhistory(){
  this.taskService.getallTaskByuserhisto(this.user.idUser).subscribe((data: any[]) => {
    this.tasks = data;
    console.log(data);
    
  }
  )
}

  archiveTask(task: Task) {
    this.taskService.archiveTask(task.id!, !task.isdeleted).subscribe(() => {

      
 
      this.cdr.detectChanges(); 
  
      this.getTaskbyhistory(); 
    });
  }
  

}


