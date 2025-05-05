import { Component } from '@angular/core'; 
import { MyServiceService } from 'src/app/services/my-service.service';
import { Router } from '@angular/router';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-project-calendar',
  templateUrl: './project-calendar.component.html',
  styleUrls: ['./project-calendar.component.css']
})
export class ProjectCalendarComponent {
  calendarOptions: CalendarOptions = {};
  events: any[] = [];
  projectProgress: number = 0;


  constructor(
    private myService: MyServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjectsWithDeadlines();

  }

  loadProjectsWithDeadlines(): void {
    this.myService.getAllProjects().subscribe((projects: any[]) => {

      const projectsWithDeadlines = projects.filter(project => project.deadline);

      this.events = projectsWithDeadlines.map(project => ({
        title: project.name,
        start: new Date(project.deadline),
        color: 'blue',
        extendedProps: {
          projectId: project.projectid,
          description: project.description || 'Aucune description'
        }
      }));
      this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: this.events,
        editable: true,
        droppable: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        dateClick: (info) => {
          alert('Date cliquée: ' + info.dateStr);
        },
        eventClick: (info) => {
          const projectId = info.event.extendedProps['projectId'];
          if (projectId) {
            this.router.navigate(['/details-projet', projectId]);
          } else {
            console.error("projectId is undefined", info.event.extendedProps);
          }
        }
      };
    });
  }
}
