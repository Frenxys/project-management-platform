import { Routes } from '@angular/router';
import { DashboardComponent } from './project-management/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'projects', component: DashboardComponent },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
];
