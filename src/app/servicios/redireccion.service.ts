import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RedireccionService {
  constructor(private router: Router) {}

  /**
   * Redirige al usuario según su rol.
   * @param roles Lista de roles del usuario.
   */
  redirigirSegunRol(roles: string[]): void {
    if (roles.includes('CLIENTE')) {
      this.router.navigate(['/inicio']);
    } else if (roles.includes('ADMIN')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }

  redirigirALogin() {
    this.router.navigate(['/login']);
  }

  redirigirARegistro() {
    this.router.navigate(['/registro']);
  }

  redirigirARegistroInmueble() {
    this.router.navigate(['/registroInmueble']);
  }

  redirigirAPerfil() {
    this.router.navigate(['/perfil']);
  }

  redirigirAHome() {
    this.router.navigate(['/']);
  }

  redirigirAHomeIngresado() {
    if(localStorage.getItem('token'))
    {
      this.router.navigate(['/inicio']);
    }
    else
    {
      this.router.navigate(['/']);
    }
  }

}
