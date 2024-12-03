import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
      margin: 10px 0;
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
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
  projects = [{ name: 'Project Alpha' }, { name: 'Project Beta' }];

  createProject() {
    const newProject = `Project ${String.fromCharCode(65 + this.projects.length)}`;
    this.projects.push({ name: newProject });
  }
}
