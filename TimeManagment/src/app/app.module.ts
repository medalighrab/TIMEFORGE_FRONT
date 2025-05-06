import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 // ✅ à ajouter ici
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

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
import { GoalsComponent } from './FrontOffice/goals/goals.component';
import { HealthReminderComponent } from './FrontOffice/health-reminder/health-reminder.component';
import { TaskComponent } from './FrontOffice/task/task.component';
import { ListeComponent } from './BackOffice/tasks/liste/liste.component';
import { TaskemployeeComponent } from './FrontOffice/taskemployee/taskemployee.component';
import { ChatComponent } from './chat/chat.component';
import { TimeManagementTechniquesComponent } from './components/time-management-techniques/time-management-techniques.component';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { CalendarIntegrationComponent } from './components/calendar-integration/calendar-integration.component';
import { SmartPlannerComponent } from './smart-planner/smart-planner.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';

import { ButtonModule } from 'primeng/button';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NotificationBellComponent } from './components/notification-bell/notification-bell.component';

import { NgChartsModule } from 'ng2-charts';


const config: SocketIoConfig = { url: 'http://localhost:8089', options: {} }; // ✅ correction ici

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
    GoalsComponent,
    HealthReminderComponent,
    TaskComponent,
    ListeComponent,
    TaskemployeeComponent,
    ChatComponent,
    TimeManagementTechniquesComponent,
    TimeTrackerComponent,
    CalendarIntegrationComponent,
    SmartPlannerComponent,
    RecommendationComponent,
    NotificationBellComponent,

  ],
  imports: [
    NgChartsModule,
    BrowserModule,
   // ✅ ajouté
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    SocketIoModule.forRoot(config),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
