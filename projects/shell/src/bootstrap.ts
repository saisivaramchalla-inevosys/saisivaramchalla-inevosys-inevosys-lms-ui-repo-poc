// Import the bootstrapApplication function from Angular's platform-browser package
import { bootstrapApplication } from '@angular/platform-browser';
// Import the application configuration
import { appConfig } from './app/app.config';
// Import the root application component
import { AppComponent } from './app/app.component';

// Bootstrap the Angular application with the root component and configuration
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Log any errors that occur during bootstrap
