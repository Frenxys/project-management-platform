import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../project.model';  // Importa l'interfaccia

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./create-project.component.css'] ,
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const newProject: Project = this.projectForm.value;  // Specifica il tipo Project

      // Verifica se siamo nel browser prima di accedere a localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedProjects = localStorage.getItem('projects');
        const projects: Project[] = storedProjects ? JSON.parse(storedProjects) : [];

        // Aggiungi il nuovo progetto all'elenco
        projects.push(newProject);

        // Memorizza l'elenco di progetti aggiornato nel localStorage
        localStorage.setItem('projects', JSON.stringify(projects));

        // Redirect alla dashboard
        this.router.navigate(['/projects']);
      }
    }
  }
}
