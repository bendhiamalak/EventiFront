import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminAccueilComponent } from './components/admin-accueil/admin-accueil.component';
import { AdminEventComponent } from './components/admin-event/admin-event.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:'admin',
    component:AdminAccueilComponent,
    canActivate:[authGuard],
    children: [
      { path: "", redirectTo: "events", pathMatch: "full" }, 
        {path:'events', component:AdminEventComponent},
        { path: 'viewDetail/:id', component: EventDetailComponent }
    ]
},
{ path: "**", redirectTo: "" } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
