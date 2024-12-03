import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent {
  tasks: string[] = [];
  taskForm: FormGroup;
  projectIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    // Crea il form per aggiungere task
    this.taskForm = this.fb.group({
      task: ['', Validators.required],
    });

    // Recupera il progetto da localStorage
    const storedProjectIndex = localStorage.getItem('currentProjectIndex');
    if (storedProjectIndex) {
      this.projectIndex = parseInt(storedProjectIndex, 10);
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      this.tasks = projects[this.projectIndex]?.tasks || [];
    }
  }

  addTask() {
    if (this.taskForm.valid && this.projectIndex !== null) {
      const newTask = this.taskForm.value.task;
      this.tasks.push(newTask);

      // Aggiorna il progetto in localStorage
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      projects[this.projectIndex].tasks = this.tasks;
      localStorage.setItem('projects', JSON.stringify(projects));

      this.taskForm.reset();
    }
  }

  deleteTask(index: number) {
    if (this.projectIndex !== null) {
      this.tasks.splice(index, 1);
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      projects[this.projectIndex].tasks = this.tasks;
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }
}
