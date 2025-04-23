import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminAccueilComponent } from './components/admin-accueil/admin-accueil.component';
import { AdminEventComponent } from './components/admin-event/admin-event.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:'admin',
    component:AdminAccueilComponent,
    children: [
        {path:'events', component:AdminEventComponent},
    ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
