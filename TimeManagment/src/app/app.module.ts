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

    ListeComponent,
     TaskemployeeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //DrawerModule, 
     
    ButtonModule
  ],
  providers: [HealthReminderService, 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
