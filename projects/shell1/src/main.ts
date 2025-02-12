/**
 * Initializes the microfrontend federation and bootstraps the application.
 *
 * This script imports the `initFederation` function from the `@angular-architects/native-federation` package
 * and uses it to initialize the federation with the provided manifest file (`federation.manifest.json`).
 * 
 * If the federation initialization is successful, it proceeds to import the `bootstrap` module to start the application.
 * 
 * Any errors encountered during the federation initialization or the bootstrap import are logged to the console.
 */
import { initFederation } from '@angular-architects/native-federation';

initFederation('federation.manifest.json')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
