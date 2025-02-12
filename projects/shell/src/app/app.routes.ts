import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

// Define the routes for the application
export const routes: Routes = [
  {
    // Route for the micro frontend (mfe)
    path: 'mfe',
    loadComponent: () =>
      loadRemoteModule({
        remoteName: 'mfe1',
        exposedModule: './MfeComponent',
      }).then((m) => m.AppComponent),
    children: [
      {
        // Load child routes for the mfe
        path: '',
        loadChildren: () =>
          loadRemoteModule({
            remoteName: 'mfe1',
            exposedModule: './routes',
          }).then((m) => m.routes),
      },
    ],
  },
  {
    // Route for the admin module
    path: 'admin',
    loadComponent: () =>
      loadRemoteModule({
        remoteName: 'admin',
        exposedModule: './AdminComponent',
      }).then((m) => m.AppComponent),
    children: [
      {
        // Load child routes for the admin module
        path: '',
        loadChildren: () =>
          loadRemoteModule({
            remoteName: 'admin',
            exposedModule: './routes',
          }).then((m) => m.routes),
      },
    ],
  },
];
