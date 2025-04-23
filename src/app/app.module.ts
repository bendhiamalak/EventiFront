import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventsComponent } from './components/events/events.component';
import { TeamComponent } from './components/team/team.component';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { HttpClientModule } from '@angular/common/http';
import { BaseURL } from './shared/baseurl';
import { ParticipateEventComponent } from './components/participate-event/participate-event.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminAccueilComponent } from './components/admin-accueil/admin-accueil.component';
import { AdminEventComponent } from './components/admin-event/admin-event.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AccueilComponent,
    EventCardComponent,
    EventsComponent,
    TeamComponent,
    CopyrightComponent,
    ParticipateEventComponent,
    LoginComponent,
    SidebarComponent,
    AdminAccueilComponent,
    AdminEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [{ provide: 'BaseURL', useValue: BaseURL }],
  bootstrap: [AppComponent]
})
export class AppModule { }
