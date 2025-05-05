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

import { ListeComponent } from './BackOffice/tasks/liste/liste.component';
import { TaskemployeeComponent } from './FrontOffice/taskemployee/taskemployee.component';
import { StatComponent } from './FrontOffice/stat/stat.component';
import { HistoriqueComponent } from './FrontOffice/historique/historique.component';
import { LeaderboardComponent } from './BackOffice/leaderboard/leaderboard.component';
import { GameComponent } from './FrontOffice/game/game.component';




const routes: Routes = [
  {
    path:"login",component:LoginComponent
  },
  { 
    path:"",component:AllTemplateFrontComponent ,

      children: [

          {path:"", component:HomeFrontComponent},
          {path:"historique", component:HistoriqueComponent} ,
          {path:"stat", component:StatComponent} ,
          {path:"game", component:GameComponent} ,

          {path:"task", component:TaskemployeeComponent} ,


    ]
  },
  {
    path:"admin",component:AllTemplateBackComponent ,

    children: [

        {path:"stats", component:StatsComponent} ,
        {path:"projets", component:ListeComponent} ,
        {path:"gamification", component:LeaderboardComponent} ,

        {path: "settings" , component:SettingsComponent}
    ]
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
