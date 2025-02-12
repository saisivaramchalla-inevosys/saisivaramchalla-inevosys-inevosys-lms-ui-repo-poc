/**
 * @fileoverview This file is responsible for bootstrapping the Angular application.
 * It imports necessary modules and configurations, and initializes the application.
 * 
 * @remarks
 * The `bootstrapApplication` function is used to bootstrap the Angular application
 * with the specified root component and configuration.
 * 
 * @example
 * ```typescript
 * import { bootstrapApplication } from '@angular/platform-browser';
 * import { appConfig } from './app/app.config';
 * import { AppComponent } from './app/app.component';
 * 
 * bootstrapApplication(AppComponent, appConfig)
 *   .catch((err) => console.error(err));
 * ```
 * 
 * @module bootstrap
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
