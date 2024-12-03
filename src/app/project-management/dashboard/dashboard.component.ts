import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../project.model';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'; // Importa CDK
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  projects: Project[] = [];
  editIndex: number | null = null;

  constructor(private router: Router) {
    this.loadProjects();
  }

  // Funzione per caricare i progetti da localStorage
  loadProjects() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
      }
    }
  }

  // Funzione per creare un nuovo progetto
  createProject() {
    this.router.navigate(['/create-project']);
  }

  // Funzione per gestire la modifica di un progetto
  enableEdit(index: number) {
    this.editIndex = index;
  }

  // Funzione per salvare la modifica
  saveEdit() {
    if (this.editIndex !== null) {
      const updatedProject = this.projects[this.editIndex];
      // Aggiorna in localStorage solo quando c'è una modifica
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('projects', JSON.stringify(this.projects));
      }
      this.editIndex = null;
    }
  }

  // Funzione per annullare la modifica
  cancelEdit() {
    this.editIndex = null;
  }

  // Funzione per eliminare un progetto
  deleteProject(index: number) {
    this.projects.splice(index, 1);
    // Rimuovi il progetto anche da localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('projects', JSON.stringify(this.projects));
    }
  }

  // Funzione per gestire il drag-and-drop dei progetti
  drop(event: CdkDragDrop<Project[]>) {
    if (event.previousIndex !== event.currentIndex) {
      const projectsCopy = [...this.projects];
      moveItemInArray(projectsCopy, event.previousIndex, event.currentIndex);
      this.projects = projectsCopy;

      // Salva l'ordine aggiornato in localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('projects', JSON.stringify(this.projects));
      }
    }
  }

  // Funzione per aprire la gestione dei task (aggiungere task a un progetto)
  openTasks(index: number) {
    // Naviga alla pagina dei task per il progetto selezionato
    this.router.navigate([`/project-tasks/${this.projects[index].name}`]);
  }
}
