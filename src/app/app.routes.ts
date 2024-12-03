import { Routes } from '@angular/router';
import { DashboardComponent } from './project-management/dashboard/dashboard.component';
import { CreateProjectComponent } from './project-management/create-project/create-project.component';

export const routes: Routes = [
  { path: 'projects', component: DashboardComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
];
