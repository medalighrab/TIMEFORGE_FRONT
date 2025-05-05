import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { StatsComponent } from './BackOffice/stats/stats.component';
import { SettingsComponent } from './BackOffice/settings/settings.component';
import { GoalsComponent } from './FrontOffice/goals/goals.component';

import { ListeComponent } from './BackOffice/tasks/liste/liste.component';
import { TaskemployeeComponent } from './FrontOffice/taskemployee/taskemployee.component';
import { AddProjectComponentComponent } from './Projet/add-project-component/add-project-component.component';

import { AssignTaskComponent } from './Task/assign-task/assign-task.component';
import { ProjectCalendarComponent } from './Projet/project-calendar/project-calendar.component';
import { ProjetDetailComponent } from './Projet/projet-detail/projet-detail.component';
import { RapportProjectComponent } from './Projet/rapport-project/rapport-project.component';
import { MeetLauncherComponent } from './meet-launcher/meet-launcher.component';
import { LoginnComponent } from './loginn/loginn.component';




const routes: Routes = [
  
  {
    path:"login",component:LoginComponent
  },
  { 
    path:"",component:AllTemplateFrontComponent ,

      children: [

          {path:"", component:HomeFrontComponent},
          {path:"task", component:TaskemployeeComponent} ,
    ]
  },
  {
    path:"admin",component:AllTemplateBackComponent ,

    children: [

        {path:"stats", component:StatsComponent} ,
        {path:"tasks", component:ListeComponent} ,
       
        {path: "settings" , component:SettingsComponent}
    ]
  },
  {
    path:"register",component:RegisterComponent
  },

  {
    path:"forgetpassword",component:ForgetPasswordComponent
  },
  { path: "face_id", component: LoginnComponent },

  
  {
    path:"MeetLauncher",component:MeetLauncherComponent
  },
 
  {
    path:"goals",component:GoalsComponent
  },
 
  { path: "A",  component:AddProjectComponentComponent } ,
  
  
  { path: 'details-projet/:id', component: ProjetDetailComponent }
,

  { path: "ASSIGNE-TASK",  component:AssignTaskComponent } ,
  
  { path: "calendrie",  component:ProjectCalendarComponent } ,
  { path: 'rapport-project/:id', component: RapportProjectComponent },

  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
