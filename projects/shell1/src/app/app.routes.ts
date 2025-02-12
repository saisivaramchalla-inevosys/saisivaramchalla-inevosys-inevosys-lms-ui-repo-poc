import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  // {
  //     path: 'mfe',
  //     loadComponent: () =>
  //       loadRemoteModule({
  //         remoteName: 'mfe1',
  //         exposedModule: './MfeComponent',
  //       }).then((m) => m.AppComponent),
  //   },
  // {
  //     path: 'mfe',
  //     // loadChildreas instead of loadComponent !!!
  //     loadChildren: () =>
  //       loadRemoteModule('mfe1', './routes').then((m) => m.routes),
  //   }
  {
    path: 'mfe',
    loadComponent: () =>
      loadRemoteModule({
        remoteName: 'mfe1',
        exposedModule: './MfeComponent',
      }).then((m) => m.AppComponent),
    children: [
      {
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
    path: 'admin',
    loadComponent: () =>
      loadRemoteModule({
        remoteName: 'admin1',
        exposedModule: './AdminComponent',
      }).then((m) => m.AppComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule({
            remoteName: 'admin1',
            exposedModule: './routes',
          }).then((m) => m.routes),
      },
    ],
  },
];