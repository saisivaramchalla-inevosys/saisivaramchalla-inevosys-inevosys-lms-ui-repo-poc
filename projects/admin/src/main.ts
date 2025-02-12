/**
 * Initializes the microfrontend federation and then dynamically imports the bootstrap module.
 * 
 * This code uses the `initFederation` function from the `@angular-architects/native-federation` package
 * to set up the microfrontend federation. If the initialization fails, it logs the error to the console.
 * After successful initialization, it dynamically imports the `./bootstrap` module. If the import fails,
 * it logs the error to the console.
 * 
 * @file /home/knight/Downloads/microfrontend-18 1/microfrontend-18/projects/admin/src/main.ts
 */
import { initFederation } from '@angular-architects/native-federation';
initFederation()
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
