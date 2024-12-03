import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../project.model';  // Importa l'interfaccia

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',  // Assicurati che il file HTML sia correttamente linkato
  styleUrls: ['./dashboard.component.css']
  
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
