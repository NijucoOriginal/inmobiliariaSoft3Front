import { Component } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-accesibilidad',
  imports: [NgIf, NgClass],
  templateUrl: './accesibilidad.component.html',
  styleUrl: './accesibilidad.component.css'
})
export class AccesibilidadComponent {
  menuVisible = false;
  zoom = 1;

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

  CambiarContraste() {
    document.body.classList.toggle('high-contrast');
  }

  CambiarAModoOscuro() {
    document.body.classList.toggle('dark-mode');
  }
}
