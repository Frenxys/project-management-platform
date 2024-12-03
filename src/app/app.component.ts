import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  
  template: `
    <nav>
      <a routerLink="/projects">Dashboard</a>
    </nav>
    <router-outlet></router-outlet> 
  `,
  styles: [`
    nav {
      background: #333;
      padding: 10px;
    }
    a {
      color: #fff;
      text-decoration: none;
      margin-right: 10px;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent {}
