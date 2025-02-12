/**
 * Initializes the microfrontend federation by loading the federation manifest
 * and then bootstraps the application.
 *
 * The `initFederation` function is called with the path to the federation manifest
 * JSON file. If an error occurs during the initialization, it is logged to the console.
 * After successful initialization, the application's bootstrap module is dynamically imported.
 * Any errors during the import are also logged to the console.
 *
 * @file /home/knight/Downloads/microfrontend-18 1/microfrontend-18/projects/shell/src/main.ts
 */
import { initFederation } from '@angular-architects/native-federation';

initFederation('/assets/federation.manifest.json')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
