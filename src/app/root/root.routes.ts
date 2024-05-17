import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/microsoft-repositories-list',
    pathMatch: 'full',
  },
  {
    path: 'microsoft-repositories-list',
    loadComponent: () =>
      import(
        '../pages/microsoft-repositories-list/components/microsoft-repositories-list.component'
      ).then((mod) => mod.MicrosoftRepositoriesListComponent),
  },
];
