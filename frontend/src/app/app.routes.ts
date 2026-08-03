import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@pages').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('@pages').then((m) => m.Register),
  },
  {
    path: 'home',
    loadComponent: () => import('@pages').then((m) => m.Home),
  },
  {
    path: 'analysis',
    loadComponent: () => import('@pages').then((m) => m.Analysis),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
