import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root', // The selector for the root component
  standalone: true, // Indicates that this component is standalone
  imports: [RouterOutlet, RouterLink], // Modules to be imported
  templateUrl: './app.component.html', // Path to the HTML template
  styleUrl: './app.component.scss' // Path to the SCSS stylesheet
})
export class AppComponent {
  title = 'admin'; // Title property for the component

  constructor() {
    // Constructor for the component
  }
}
