import { Component } from '@angular/core';

// Component decorator to define metadata for the FlightSearchComponent
@Component({
  selector: 'app-flight-search', // The selector used to identify this component in a template
  standalone: true, // Indicates that this component is standalone and does not require a module
  imports: [], // List of modules to import for this component
  templateUrl: './flight-search.component.html', // Path to the HTML template for this component
  styleUrl: './flight-search.component.scss' // Path to the SCSS stylesheet for this component
})
export class FlightSearchComponent {
  // The class definition for the FlightSearchComponent
}
