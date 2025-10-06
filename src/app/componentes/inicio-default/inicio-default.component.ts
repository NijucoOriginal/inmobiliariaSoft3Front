import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RedireccionService } from '../../servicios/redireccion.service';

@Component({
  selector: 'app-inicio-default',
  imports: [CommonModule],
  templateUrl: './inicio-default.component.html',
  styleUrl: './inicio-default.component.css'
})
export class InicioDefaultComponent {
  constructor(private router: Router,protected redireccionamiento:RedireccionService) {}

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

}
