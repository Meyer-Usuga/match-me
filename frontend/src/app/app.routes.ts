import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from '@core';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@pages').then((m) => m.Login),
    canActivate: [noAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('@pages').then((m) => m.Register),
    canActivate: [noAuthGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('@pages').then((m) => m.Home),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@pages').then((m) => m.Dashboard),
    canActivate: [authGuard],
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('@pages').then((m) => m.Detail),
    canActivate: [authGuard],
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
