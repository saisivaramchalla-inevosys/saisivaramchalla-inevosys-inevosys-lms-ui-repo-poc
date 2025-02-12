import { Component } from '@angular/core';

// Decorator that marks a class as an Angular component and provides configuration metadata
@Component({
  selector: 'app-flight-packages', // The CSS selector that identifies this component in a template
  standalone: true, // Indicates that this component is a standalone component
  imports: [], // List of modules or components to import
  templateUrl: './flight-packages.component.html', // Path to the HTML template file
  styleUrl: './flight-packages.component.scss' // Path to the SCSS stylesheet file
})
export class FlightPackagesComponent {
  // Component logic goes here
}
