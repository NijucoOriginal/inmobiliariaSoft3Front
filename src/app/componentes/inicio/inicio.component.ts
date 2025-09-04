import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-inicio',
    imports: [
        RouterLink,
        RouterOutlet
    ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  isLogged = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLogged = this.authService.isAuthenticated();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isLogged = false; // Actualiza estado local
  }

}
