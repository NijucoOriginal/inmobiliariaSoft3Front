import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CaptacionInmuebleDTO} from '../dto/captacion-inmueble-dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InmuebleServiceService {
  //private url = "https://inmobiliariasoft3back2-0.onrender.com/api/usuarios";
  private url='http://localhost:8080/api/inmuebles';
  constructor(private http: HttpClient) {

  }

  public registrarInmueble(archivos: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}`, archivos);
  }
}
