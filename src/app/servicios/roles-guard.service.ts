import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }
  const expectedRoles: string[] = route.data['expectedRoles'];
  const userRoles = authService.getRoles();
  const hasRole = expectedRoles.some(role => userRoles.includes(role));
  return hasRole ? true : router.createUrlTree(['/unauthorized']);
};
