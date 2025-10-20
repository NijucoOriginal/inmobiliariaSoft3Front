import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegistroInmuebleRequest } from '../dto/registro-inmueble-request';

@Injectable({
  providedIn: 'root'
})
export class RegistroInmuebleService {
  private apiUrl = `${environment.backendUrl}/api/inmuebles`;

  constructor(private http: HttpClient) { }

  registrarInmueble(inmueble: RegistroInmuebleRequest): Observable<any> {
    // Validate image URLs before sending
    for (const url of inmueble.imagenes) {
      if (url.length > 255) {
        throw new Error(`La URL de la imagen "${url.substring(0, 50)}..." es demasiado larga (máximo 255 caracteres)`);
      }
    }
    
    return this.http.post(`${this.apiUrl}`, inmueble);
  }
}