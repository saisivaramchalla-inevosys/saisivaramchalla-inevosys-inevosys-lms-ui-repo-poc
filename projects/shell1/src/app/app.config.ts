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

// import { provideHttpClient,HttpClient  } from '@angular/common/http';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { MultiTranslateLoader } from '../../../shared/src/lib/service/multi-translate-loader.service';

// export function httpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak
      .init({
        config: {
          url: 'http://localhost:8080',
          realm: 'quick_realm',
          clientId: 'quick_client',
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
        enableBearerInterceptor: true,
      })
      .then(async (authenticated) => {
        if (authenticated) {
          localStorage.setItem('Token', await keycloak.getToken());
        } else {
          console.warn('User not authenticated');
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error);
      });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    KeycloakService,
    // provideHttpClient(), // Provide HttpClient
    //     importProvidersFrom(
    //       TranslateModule.forRoot({
    //         loader: {
    //           provide: TranslateLoader,
    //           useFactory: httpLoaderFactory,
    //           deps: [HttpClient],
    //         },
    //       })
    //     ),
  ],
};