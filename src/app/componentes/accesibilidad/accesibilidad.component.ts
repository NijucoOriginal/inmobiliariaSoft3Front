import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-accesibilidad',
  imports: [CommonModule, FormsModule],
  templateUrl: './accesibilidad.component.html',
  styleUrl: './accesibilidad.component.css'
})
export class AccesibilidadComponent {
  menuVisible = false;
  zoom = 1;
  modoOscuro = false;
  altoContraste = false;

  constructor() {
  }

  CambiarContraste() {

  }

  CambiarModoOscuro() {

  }

  MostrarMenu() {
    this.menuVisible = !this.menuVisible;
  }

  aumentarTexto() {
    this.zoom += 0.1;
    document.body.style.zoom = String(this.zoom);
  }

  disminuirTexto() {
    if (this.zoom > 0.8) {
      this.zoom -= 0.1;
      document.body.style.zoom = String(this.zoom);
    }
  }

  onSliderChange(event: Event) {
    const nuevoZoom = parseFloat((event.target as HTMLInputElement).value);

    if (nuevoZoom > this.zoom) {
      this.aumentarTexto();
    } else if (nuevoZoom < this.zoom) {
      this.disminuirTexto();
    }
  }

}
