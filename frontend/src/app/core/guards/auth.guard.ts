import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getCookie } from '../utils/cookie.utils';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = getCookie('access_token');

  if (token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = getCookie('access_token');

  if (token) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
