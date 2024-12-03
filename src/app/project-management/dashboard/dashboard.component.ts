import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../project.model'; // Importa l'interfaccia

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  projects: Project[] = [];
  editIndex: number | null = null; // Indice del progetto attualmente in modifica

  constructor(private router: Router) {
    this.loadProjects();
  }

  createProject() {
    this.router.navigate(['/create-project']);
  }

  loadProjects() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
      }
    }
  }

  deleteProject(index: number) {
    this.projects.splice(index, 1);
    this.updateLocalStorage();
  }

  enableEdit(index: number) {
    this.editIndex = index;
  }

  saveEdit() {
    this.updateLocalStorage();
    this.editIndex = null; // Esci dalla modalità modifica
  }

  cancelEdit() {
    this.loadProjects(); // Ricarica i progetti per annullare le modifiche non salvate
    this.editIndex = null;
  }

  updateLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('projects', JSON.stringify(this.projects));
    }
  }
}
