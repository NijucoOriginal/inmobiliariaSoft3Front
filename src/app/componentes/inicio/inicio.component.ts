import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from '../../servicios/auth.service';
import {MapaService} from '../../mapa.service';

@Component({
  selector: 'app-inicio',
    imports: [
        RouterLink,
        RouterOutlet
    ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  isLogged = false;
  usuarioConectado='';

  constructor(private authService: AuthService, private router: Router, private mapaService: MapaService) {
    this.isLogged = this.authService.isAuthenticated();
    this.usuarioConectado=this.authService.getRoles();
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();

  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isLogged = false; // Actualiza estado local
  }

}
