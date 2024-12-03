import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../project.model';  // Importa l'interfaccia

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Project Management Dashboard</h1>
    <button (click)="createProject()">Create New Project</button>
    <ul>
      <li *ngFor="let project of projects">{{ project.name }}</li>
    </ul>
  `,
  styles: [`
    button {
      margin: 10px;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 10px;
      background-color: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 5px 0;
    }
  `]
})
export class DashboardComponent {
  projects: Project[] = [];

  constructor(private router: Router) {
    this.loadProjects();
  }

  createProject() {
    this.router.navigate(['/create-project']);
  }

  loadProjects() {
    if (typeof window !== 'undefined' && window.localStorage) {  // Verifica se siamo nel browser
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);  // Carica i progetti salvati
      }
    }
  }
}
