import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../../servicios/auth.service';
import {MapaService} from '../../mapa.service';

@Component({
  selector: 'app-inicio',
    imports: [
        RouterLink
    ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  isLogged = false;
  usuarioConectado='';
  userEmail: string | null = null;

  constructor(private authService: AuthService, private router: Router, private mapaService: MapaService) {
    this.isLogged = this.authService.isAuthenticated();
    this.usuarioConectado=this.authService.getRoles();
    // Obtener el email del almacenamiento local
    if (this.isLogged) {
      this.userEmail = this.authService.getUserEmail();
    }
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();

  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isLogged = false;
    this.userEmail = null;
  }

}
