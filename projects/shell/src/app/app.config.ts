import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';


// Function to initialize Keycloak
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak
      .init({
        config: {
          url: 'http://localhost:8080', // Keycloak server URL
          realm: 'quick_realm', // Keycloak realm
          clientId: 'quick_client', // Keycloak client ID
        },
        initOptions: {
          onLoad: 'login-required', // Require login on load
          checkLoginIframe: false, // Disable login iframe check
        },
        enableBearerInterceptor: true, // Enable bearer token interceptor
      })
      .then(async (authenticated) => {
        if (authenticated) {
          // Store token in local storage if authenticated
          localStorage.setItem('Token', await keycloak.getToken());
        } else {
          console.warn('User not authenticated');
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error);
      });
}

// Application configuration
export const appConfig: ApplicationConfig = {
  providers: [
    // Enable zone change detection with event coalescing
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Provide router with application routes
    provideRouter(routes),

    {
      // Initialize Keycloak on application startup
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    // Provide Keycloak service
    KeycloakService,
  ],
};
