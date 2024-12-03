import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  template: `
    <nav>
      <a routerLink="/projects">Dashboard</a> |
      <a routerLink="/create-project">Create Project</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [/* stili... */]
})
export class AppComponent {}
