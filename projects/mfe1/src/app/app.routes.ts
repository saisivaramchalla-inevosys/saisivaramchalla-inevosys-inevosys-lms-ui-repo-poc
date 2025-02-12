import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

// Define the routes for the application
export const routes: Routes = [
    {
        // Route for the flight search component
        path: 'flightsearch',
        loadComponent: () => import('./components/flight-search/flight-search.component').then((c) => c.FlightSearchComponent)
    },
    {
        // Route for the flight packages component
        path: 'holiday',
        loadComponent: () => import('./components/flight-packages/flight-packages.component').then((c) => c.FlightPackagesComponent)
    }
];
