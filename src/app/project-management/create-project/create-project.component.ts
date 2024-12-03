import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../project.model';  // Importa l'interfaccia

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1>Create New Project</h1>
    <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="projectName">Project Name</label>
        <input id="projectName" formControlName="name" />
        <div *ngIf="projectForm.controls['name'].invalid && projectForm.controls['name'].touched">
          <small class="error">Project Name is required</small>
        </div>
      </div>

      <div>
        <label for="description">Project Description</label>
        <textarea id="description" formControlName="description"></textarea>
      </div>

      <button type="submit" [disabled]="projectForm.invalid">Create Project</button>
    </form>
  `,
  styles: [`
    .error {
      color: red;
      font-size: 0.8rem;
    }
    form {
      display: flex;
      flex-direction: column;
      max-width: 400px;
      margin: 20px auto;
    }
    div {
      margin-bottom: 10px;
    }
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ddd;
    }
  `]
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
