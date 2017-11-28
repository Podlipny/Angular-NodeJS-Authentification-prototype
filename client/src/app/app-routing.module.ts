import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './views/profile/profile.component';


const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  // { path: '', loadChildren: 'app/views/dashboard/dashboard.module#DashboardModule' }
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
