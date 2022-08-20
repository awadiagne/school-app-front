import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasseDetailsComponent } from './classes/classe-details/classe-details.component';
import { ClasseComponent } from './classes/classe/classe.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EleveDetailsComponent } from './eleves/eleve-details/eleve-details.component';
import { EleveComponent } from './eleves/eleve/eleve.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent 
  },
  {
    path : "classes",
    component : ClasseComponent
  },
  {
    path : "classeDetails/:id",
    component : ClasseDetailsComponent
  },
  {
    path : "eleves",
    component : EleveComponent
  },
  {
    path : "elevesDetails/:id",
    component : EleveDetailsComponent
  },
  {
    path : "",
    redirectTo : "dashboard",
    pathMatch : "full"
  },
  {
    path : "*",
    redirectTo : "dashboard"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
