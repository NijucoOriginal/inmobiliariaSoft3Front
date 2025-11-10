import { Component } from '@angular/core';
import {InmuebleServiceService} from '../../servicios/inmueble-service.service';
import {InmuebleResponse} from '../../dto/inmueble-response';
import {CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-inmuebles-proceso',
  templateUrl: './ventana-agente.component.html',
  imports: [
    CurrencyPipe,
    FormsModule
  ],
  styleUrls: ['./ventana-agente.component.css']
})
export class VentanaAgenteComponent {
  userName = 'Nicolás';

  constructor(protected inmuebleService: InmuebleServiceService) {
  }

  propiedadesDestacadas: InmuebleResponse[] = [];



  ngOnInit(): void {
    this.inmuebleService.obtenerListaDeInmuebles().subscribe({
      next: (inmuebles) => {
        this.propiedadesDestacadas = inmuebles;
        console.log('Propiedades destacadas cargadas:', inmuebles);
      },
      error: (err) => {
        console.error('Error al obtener inmuebles', err);
      }
    });
  }


  /*aceptarProceso() {
    const seleccionados = this.listaInmuebles.filter(i => i.seleccionado);
    console.log('Inmuebles seleccionados:', seleccionados);
    // Aquí podrías enviar los IDs seleccionados al backend
  }

   */
}

