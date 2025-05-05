import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { StatsComponent } from './BackOffice/stats/stats.component';
import { TablesComponent } from './BackOffice/tables/tables.component';
import { SettingsComponent } from './BackOffice/settings/settings.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { GoalsComponent } from './FrontOffice/goals/goals.component';
import { HealthReminderService } from './FrontOffice/service/health-reminder.service';

import { ListeComponent } from './BackOffice/tasks/liste/liste.component';
import { TokenInterceptor } from './Interceptor/token-interceptor';
import { TaskemployeeComponent } from './FrontOffice/taskemployee/taskemployee.component';
import { AddProjectComponentComponent } from './Projet/add-project-component/add-project-component.component';

import { AssignTaskComponent } from './Task/assign-task/assign-task.component';
import { TaskByProjectComponent } from './Task/task-by-project/task-by-project.component';
import { TaskByUserComponent } from './Task/task-by-user/task-by-user.component';
import { ProjectCalendarComponent } from './Projet/project-calendar/project-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ProjetDetailComponent } from './Projet/projet-detail/projet-detail.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { RapportProjectComponent } from './Projet/rapport-project/rapport-project.component';
import { MeetLauncherComponent } from './meet-launcher/meet-launcher.component';
import { LoginnComponent } from './loginn/loginn.component';
import { WebcamModule } from 'ngx-webcam';


@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    HomeFrontComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    StatsComponent,
    TablesComponent,
    SettingsComponent,
    AddProjectComponentComponent,
  
    GoalsComponent,

    ListeComponent,
     TaskemployeeComponent,
     AddProjectComponentComponent,
  
     AssignTaskComponent,
     TaskByProjectComponent,
     TaskByUserComponent,
     ProjectCalendarComponent,
     ProjetDetailComponent,
     UserProfileComponent,
     RapportProjectComponent,
     MeetLauncherComponent,
     LoginnComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    WebcamModule,
    
    

    //DrawerModule, 
     
    ButtonModule
  ],
  providers: [HealthReminderService, 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Ajoute cette ligne ici

})

export class AppModule { }
