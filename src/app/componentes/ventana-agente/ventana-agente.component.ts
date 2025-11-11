import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InmuebleServiceService } from '../../servicios/inmueble-service.service';
import { InmuebleResponse } from '../../dto/inmueble-response';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inmuebles-proceso',
  templateUrl: './ventana-agente.component.html',
  styleUrls: ['./ventana-agente.component.css'],
  standalone: true,
  imports: [
    CommonModule,       // ✅ Esto es lo que faltaba
    CurrencyPipe,
    FormsModule
  ]
})
export class VentanaAgenteComponent implements OnInit {
  userName = 'Nicolás';
  propiedadesDestacadas: InmuebleResponse[] = [];
  propiedadSeleccionada: InmuebleResponse | null = null;

  constructor(protected inmuebleService: InmuebleServiceService) {}

  ngOnInit(): void {
    const correoUsuario = localStorage.getItem('userEmail') || '';
    this.inmuebleService.obtenerListaInmueblesAgente(correoUsuario).subscribe({
      next: (inmuebles) => {
        this.propiedadesDestacadas = inmuebles;
        console.log('Propiedades destacadas cargadas:', inmuebles);
      },
      error: (err) => {
        console.error('Error al obtener inmuebles', err);
      }
    });
  }

  aceptarProceso(_t15: InmuebleResponse): void {
    console.log('Proceso aceptado con:', this.propiedadSeleccionada);
    // lógica adicional aquí
  }

  cancelarProceso(): void {
    this.propiedadSeleccionada = null;
    console.log('Proceso cancelado');
  }


  onSeleccionarInmueble(event: Event, inmueble: InmuebleResponse): void {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    if (checked) {
      this.propiedadSeleccionada = inmueble;
    } else {
      this.propiedadSeleccionada = null;
    }
  }


}
