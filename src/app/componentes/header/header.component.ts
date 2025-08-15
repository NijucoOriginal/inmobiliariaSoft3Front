import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'MI APP';
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
