import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { MapaService } from '../../mapa.service';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, UserMenuComponent]
})
export class InicioComponent implements OnInit {
  isLogged = false;
  usuarioConectado = '';
  userEmail: string | null = null;
  tipoInicio: string = 'INVITADO'; // Puede ser USUARIO, ASESOR, INVITADO, etc.
  userName: string = '';

  constructor(private authService: AuthService, private router: Router, private mapaService: MapaService) {
    this.isLogged = this.authService.isAuthenticated();
    const rolesArr = this.authService.getRoles();
    this.usuarioConectado = Array.isArray(rolesArr) && rolesArr.length > 0 ? rolesArr[0] : '';
    if (this.isLogged && this.usuarioConectado === 'CLIENTE') {
      this.userEmail = this.authService.getUserEmail();
      this.userName = this.userEmail || 'Usuario';
      this.tipoInicio = 'CLIENTE';
    } else {
      this.tipoInicio = 'INVITADO';
    }
  }

  ngOnInit(): void {
    // Ya no se redirige a inicio-default, todo se gestiona aquí
    this.mapaService.crearMapa();
  }

  public logout() {
    this.authService.logout();
    window.location.reload();
  }
}
