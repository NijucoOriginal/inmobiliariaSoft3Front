import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {InmuebleServiceService} from '../../servicios/inmueble-service.service';
import {InmuebleResponse} from '../../dto/inmueble-response';
import {FormsModule} from '@angular/forms';
import {TipoNegocio} from '../../modelo/TipoNegocio';
import {AuthService} from '../../servicios/auth.service';

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
  @Output() logout = new EventEmitter<void>();
  userName = 'Nicolás';
  propiedadesDestacadas: InmuebleResponse[] = [];
  propiedadSeleccionada: InmuebleResponse | null = null;
  correoUsuario = localStorage.getItem('userEmail') || '';

  constructor(protected inmuebleService: InmuebleServiceService,protected authservice: AuthService) {}

  ngOnInit(): void {
    this.inmuebleService.obtenerListaInmueblesAgente(this.correoUsuario).subscribe({
      next: (inmuebles) => {
        this.propiedadesDestacadas = inmuebles;
        console.log('Propiedades destacadas cargadas:', inmuebles);
      },
      error: (err) => {
        console.error('Error al obtener inmuebles', err);
      }
    });
  }

  aceptarProceso(inmueble: InmuebleResponse): void {
    console.log('Inmueble recibido desde el botón:', inmueble);

    let nuevoEstado = 'EN_PROCESO';

    if (inmueble.tipoNegocio === TipoNegocio.ALQUILER) {
      nuevoEstado = 'PROCESOALQUIER';
    }

    if (inmueble.tipoNegocio === TipoNegocio.PERMUTACION) {
      nuevoEstado = 'PROCESOPERMUTACION';
    }

    if (inmueble.tipoNegocio === TipoNegocio.VENTA) {
      nuevoEstado = 'PROCESOCOMPRA';
    }

    this.inmuebleService.actualizarEstadoTransaccion(inmueble.id, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Estado actualizado:', response);
        this.propiedadSeleccionada = response;

        window.location.reload();
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
      }
    });
  }


  cancelarProceso(inmueble: InmuebleResponse): void {
    console.log('Inmueble recibido desde el botón:', inmueble);

    let nuevoEstado = 'NOADMITIDA';

    this.inmuebleService.actualizarEstadoTransaccion(inmueble.id, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Estado actualizado:', response);
        this.propiedadSeleccionada = response;

        window.location.reload();
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
      }
    });
  }

  onLogout() {
    this.authservice.logout();
  }
}
