import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const usuarioInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // No aplicar el interceptor a las rutas de registro o autenticación
  if (req.url.includes('/api/usuarios') || req.url.includes('/api/auth')) {
    return next(req);
  }

  if ( !authService.isAuthenticated() ) {
    return next(req);
  }

  const token = authService.getToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};