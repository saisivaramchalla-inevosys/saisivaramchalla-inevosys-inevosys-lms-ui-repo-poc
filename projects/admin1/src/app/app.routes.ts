import { Routes } from '@angular/router';

// Define the routes for the application
export const routes: Routes = [
    {
        // Route for profile management
        path: 'profile',
        loadComponent: () => import('./components/profile-management/profile-management.component').then((c) => c.ProfileManagementComponent)
    },
    {
        // Route for user management
        path: 'user',
        loadComponent: () => import('./components/user-management/user-management.component').then((c) => c.UserManagementComponent)
    }
];
