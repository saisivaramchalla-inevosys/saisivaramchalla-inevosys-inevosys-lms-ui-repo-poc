import { bootstrapApplication } from '@angular/platform-browser'; // Import the bootstrapApplication function from Angular platform-browser
import { appConfig } from './app/app.config'; // Import the application configuration
import { AppComponent } from './app/app.component'; // Import the root application component

// Bootstrap the Angular application with the root component and configuration
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Log any errors that occur during the bootstrap process
