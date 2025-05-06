import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { Task } from 'src/app/models/Task';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit,AfterViewInit,OnChanges {
  tasks: any[] = [];
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  username: any;

  user:any
   @ViewChild('taskChart') taskChartCanvas!: ElementRef<HTMLCanvasElement>;
   @ViewChild('taskChart1') taskChartCanvas1!: ElementRef<HTMLCanvasElement>;

    public chart: any;
    private chartData: any; 
    private chartData1: any; 

  constructor(
    private authService: AuthService ,
    private taskService: TaskService ,
    private cdr: ChangeDetectorRef,
    private userService: UsersService) {}
  ngOnInit(): void {
    this.username= this.authService.getUsernameFromToken();
   
    this.userService.getUser(this.username).subscribe((data)=>{
      this.user=data;
      console.log(this.user.idUser);
      this.getchart()
    }
    )
  
    
  }


  createDurationChart(): void {
    if (this.taskChartCanvas1 && this.chartData1) {
      const ctx = this.taskChartCanvas1.nativeElement.getContext('2d')!;
  
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Estimation Totale', 'Durée Réelle Totale', 'Retard Total'],
            datasets: [{
              label: 'Durée des Tâches (en heures)',
              data: [
                this.chartData1.totalEstimatedDuration,
                this.chartData1.totalActualDuration,
                this.chartData1.totalDelay
              ],
              backgroundColor: ['#36A2EB', '#4BC0C0', '#FF6384'],
              borderColor: ['#36A2EB', '#4BC0C0', '#FF6384'],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } else {
        console.error('Canvas context not available for duration chart');
      }
    } else {
      console.error('Chart data or canvas element is missing for duration chart');
    }
  }
  
  createChart(): void {
    if (this.taskChartCanvas && this.chartData) {
      const ctx = this.taskChartCanvas.nativeElement.getContext('2d');
      
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Total Tasks', 'To Do', 'In Progress', 'Done', 'Late'],
            datasets: [{
              label: 'Task Statistics',
              data: [
                this.chartData.totalTasks, 
                this.chartData.todoTasks, 
                this.chartData.inProgressTasks, 
                this.chartData.doneTasks, 
                this.chartData.lateTasks,
              ],
              backgroundColor: ['#FF5733', '#FFC300', '#FF33FF', '#33FF57', '#3357FF'],
              borderColor: ['#FF5733', '#FFC300', '#FF33FF', '#33FF57', '#3357FF'],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } else {
        console.error('Canvas context not available');
      }
    } else {
      console.error('Chart data or canvas element is missing');
    }
  }

  getchart(){
  
    this.taskService.getTaskestimation(this.user.idUser).subscribe(data => {
      this.chartData1 = data;
      this.createDurationChart()
    });
    this.taskService.getTaskStatistics(this.user.idUser).subscribe(data => {
      this.chartData = data;
      this.createChart();
    });
  }
  ngAfterViewInit(): void {
    this.createChart(); 
    this.createDurationChart();
  }
  archiveTask(task: Task) {
    this.taskService.archiveTask(task.id!, !task.isdeleted).subscribe(() => {
      if (this.chart) {
        this.chart.destroy();
      }
      if (this.chartData) {
        this.chartData = null; 
      }
      
      this.getchart();
      this.cdr.detectChanges(); 
  
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.createChart();
    this.createDurationChart();
  }
}

