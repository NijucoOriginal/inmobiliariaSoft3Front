import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { MapaService } from '../../mapa.service';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { RedireccionService } from '../../servicios/redireccion.service';

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

  constructor(private authService: AuthService, private router: Router, private mapaService: MapaService,protected redireccionamiento:RedireccionService) {
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

  propiedadesDestacadas = [
    {
      imagen: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      titulo: 'Casa Moderna en el Centro',
      descripcion: 'Hermosa casa con amplios espacios, ideal para familia.',
      tipo: 'Casa',
      area: '180 m²',
      habitaciones: 4,
      banos: 3,
      badge: 'VENTA',
      precio: '$ 590.000.000'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      titulo: 'Apartamento Moderno',
      descripcion: 'Moderno apartamento con vista panorámica y amenities.',
      tipo: 'Apartamento',
      area: '95 m²',
      habitaciones: 3,
      banos: 2,
      badge: 'ALQUILER',
      precio: '$ 2.500.000/mes'
    },
    {
      imagen: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      titulo: 'Finca Campestre',
      descripcion: 'Hermosa finca a 30 minutos de Bogotá, perfecta para descanso.',
      tipo: 'Finca',
      area: '5000 m²',
      habitaciones: 5,
      banos: 4,
      badge: 'PERMUTA',
      precio: '$ 890.000.000'
    }
  ];

  ngOnInit(): void {
    // Ya no se redirige a inicio-default, todo se gestiona aquí
    this.mapaService.crearMapa();
  }

  public logout() {
    this.authService.logout();
    window.location.reload();
  }

}
