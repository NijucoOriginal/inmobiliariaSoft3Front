import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import {CaptacionInmuebleDTO} from './dto/captacion-inmueble-dto';

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  mapa: any;
  marcador: any;
  posicionActual: LngLatLike;
  constructor() {
    //this.marcadores = [];
    this.posicionActual = [-75.67270, 4.53252];
  }
  public crearMapa() {
    this.mapa = new mapboxgl.Map({
      accessToken: 'pk.eyJ1Ijoibmljb2xhc3BlbmEiLCJhIjoiY21mNW5xeHcyMDNxNTJzcHhqNmNkanptbSJ9.LwkC_ifCLcl9yKbXMZf31w',
      container: 'mapa',
      style: 'mapbox://styles/mapbox/standard',
      center: this.posicionActual,
      pitch: 45,
      zoom: 17
    });
    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      })
    );
  }

  public agregarMarcador(): void {
    const mapaGlobal = this.mapa;

    mapaGlobal.on('click', (e: any) => {
      if (this.marcador) {
        this.marcador.remove();
      }

      this.marcador = new mapboxgl.Marker({color: 'red'})
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(mapaGlobal);
    });
  }

 /* public pintarMarcadores(reportes: CaptacionInmuebleDTO[]) {
    reportes.forEach(reporte => {
      new mapboxgl.Marker({color: 'red'})
        .setLngLat([reporte.ubicacion.longitud, reporte.ubicacion.latitud])
        .setPopup(new mapboxgl.Popup().setHTML(reporte.titulo))
        .addTo(this.mapa);
    });
  }

  */
}
