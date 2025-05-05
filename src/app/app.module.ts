import { NgModule } from '@angular/core';
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
import { HealthReminderComponent } from './FrontOffice/health-reminder/health-reminder.component';
import { HealthReminderService } from './FrontOffice/service/health-reminder.service';

import { ListeComponent } from './BackOffice/tasks/liste/liste.component';
import { TokenInterceptor } from './Interceptor/token-interceptor';
import { TaskemployeeComponent } from './FrontOffice/taskemployee/taskemployee.component';
import { NgChartsModule } from 'ng2-charts';
import { HistoriqueComponent } from './FrontOffice/historique/historique.component';
import { StatComponent } from './FrontOffice/stat/stat.component';
import { LeaderboardComponent } from './BackOffice/leaderboard/leaderboard.component';
import { GameComponent } from './FrontOffice/game/game.component';
import { GamificationBadgeComponent } from './gamification-badge/gamification-badge.component';
import { ChatbotComponent } from './FrontOffice/chatbot/chatbot.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
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
  
    GoalsComponent,
    HealthReminderComponent,

    ListeComponent,
     TaskemployeeComponent,
     HistoriqueComponent,
     StatComponent,
     LeaderboardComponent,
     GameComponent,
     GamificationBadgeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //DrawerModule, 
    ButtonModule,
    NgChartsModule
  ],
  providers: [HealthReminderService, 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
