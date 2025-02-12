/**
 * Initializes the microfrontend federation and bootstraps the application.
 *
 * This code imports the `initFederation` function from the `@angular-architects/native-federation` package
 * and calls it to initialize the microfrontend federation. If an error occurs during initialization,
 * it is logged to the console. After successful initialization, the application is bootstrapped by
 * dynamically importing the `./bootstrap` module. Any errors during the bootstrap process are also
 * logged to the console.
 */
import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
