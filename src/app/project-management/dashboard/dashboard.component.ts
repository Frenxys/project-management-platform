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
  deleteProject(index: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Rimuovi il progetto dall'array
      this.projects.splice(index, 1);
      // Aggiorna il localStorage
      localStorage.setItem('projects', JSON.stringify(this.projects));
    }
  }
  
  editProject(index: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const projectToEdit = this.projects[index];
      // Memorizza il progetto da modificare in localStorage (o usa un servizio di stato globale)
      localStorage.setItem('projectToEdit', JSON.stringify(projectToEdit));
      // Naviga al modulo di creazione con il progetto precompilato
      this.router.navigate(['/create-project']);
    }
  }
  
}
