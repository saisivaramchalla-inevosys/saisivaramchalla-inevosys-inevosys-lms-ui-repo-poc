import {
  APP_INITIALIZER, // Token to provide a function to be executed during application initialization
  ApplicationConfig, // Interface for application configuration
  importProvidersFrom, // Function to import providers from another module
  isDevMode, // Function to check if the application is in development mode
  provideZoneChangeDetection, // Function to provide zone change detection configuration
} from '@angular/core';
import { provideRouter } from '@angular/router'; // Function to provide router configuration
import { KeycloakService } from 'keycloak-angular'; // Keycloak service for Angular
import { routes } from './app.routes'; // Application routes

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
          console.warn('User not authenticated'); // Log warning if not authenticated
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error); // Log error if initialization fails
      });
}

// Application configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Provide zone change detection with event coalescing
    provideRouter(routes), // Provide router with application routes
    
    {
      provide: APP_INITIALIZER, // Provide APP_INITIALIZER token
      useFactory: initializeKeycloak, // Use initializeKeycloak function as factory
      multi: true, // Allow multiple APP_INITIALIZER providers
      deps: [KeycloakService], // Dependencies for the factory function
    },
    KeycloakService, // Provide KeycloakService
  ],
};