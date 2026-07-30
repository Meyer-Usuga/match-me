import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@pages').then((m) => m.Login),
  },
  {
    path: 'home',
    loadComponent: () => import('@pages').then((m) => m.Home),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
