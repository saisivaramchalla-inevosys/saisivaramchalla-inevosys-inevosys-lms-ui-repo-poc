import { Component } from '@angular/core';

// Define the component with metadata
@Component({
  selector: 'lib-shared', // The selector used in HTML to identify this component
  standalone: true, // Indicates that this component is standalone
  imports: [], // List of modules to import (empty in this case)
  template: `
    <p>
      shared works!
    </p>
  `, // Inline template for the component
  styles: `` // Inline styles for the component (empty in this case)
})
export class SharedComponent {
  // Component logic goes here (currently empty)
}
