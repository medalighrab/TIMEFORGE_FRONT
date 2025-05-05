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
import { HealthReminderComponent } from './FrontOffice/health-reminder/health-reminder.component';
import { TaskComponent } from './FrontOffice/task/task.component';

import { ListeComponent } from './BackOffice/tasks/liste/liste.component';
import { TaskemployeeComponent } from './FrontOffice/taskemployee/taskemployee.component';
import { ChatComponent } from './chat/chat.component';
import { AdminGoalComponent } from './BackOffice/admin-goal/admin-goal.component';




const routes: Routes = [
  {
    path:"login",component:LoginComponent
  },
  { 
    path:"",component:AllTemplateFrontComponent ,

      children: [

          {path:"", component:HomeFrontComponent},
          {path:"task", component:TaskemployeeComponent} ,
          {
            path:"chat/:userId",component:ChatComponent
          },
    ]
  },
  {
    path:"admin",component:AllTemplateBackComponent ,

    children: [

        {path:"stats", component:StatsComponent} ,
        {path:"tasks", component:ListeComponent} ,
        { path: "goal", component: AdminGoalComponent },

       
        {path: "settings" , component:SettingsComponent}
    ]
  },
  {
    path:"TasksList",component:TaskComponent
  },
  {
    path:"register",component:RegisterComponent
  },

  {
    path:"forgetpassword",component:ForgetPasswordComponent
  },

 
  {
    path:"goals",component:GoalsComponent
  },
  {
    path:"health",component:HealthReminderComponent
  },
  
 
  

  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
