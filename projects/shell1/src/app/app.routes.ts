import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  // Route configuration for the 'mfe' path
  {
    path: 'mfe',
    // Load the remote component for 'mfe'
    loadComponent: () =>
      loadRemoteModule({
        remoteName: 'mfe1',
        exposedModule: './MfeComponent',
      }).then((m) => m.AppComponent),
    // Define child routes for 'mfe'
    children: [
      {
        path: '',
        // Load the remote routes for 'mfe'
        loadChildren: () =>
          loadRemoteModule({
            remoteName: 'mfe1',
            exposedModule: './routes',
          }).then((m) => m.routes),
      },
    ],
  },
  // Route configuration for the 'admin' path
  {
    path: 'admin',
    // Load the remote component for 'admin'
    loadComponent: () =>
      loadRemoteModule({
        remoteName: 'admin1',
        exposedModule: './AdminComponent',
      }).then((m) => m.AppComponent),
    // Define child routes for 'admin'
    children: [
      {
        path: '',
        // Load the remote routes for 'admin'
        loadChildren: () =>
          loadRemoteModule({
            remoteName: 'admin1',
            exposedModule: './routes',
          }).then((m) => m.routes),
      },
    ],
  },
];
