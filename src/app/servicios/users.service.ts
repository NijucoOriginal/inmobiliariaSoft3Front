import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponse} from '../dto/user-response';
import {UserRegistrationRequest} from '../dto/user-registration-request';
import {DesvincularRequestDto} from '../dto/desvincular-request-dto';
import {User} from '../modelo/User';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //private url = "https://inmobiliariasoft3back2-0.onrender.com/api/usuarios";
  private url='http://localhost:8080/api/usuarios';
  constructor(private http: HttpClient, private authservice: AuthService) {}

  public registrar(user: UserRegistrationRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.url}`, user);
  }

  /*
  public desvincular(email: string): Observable<string> {
  const token = this.authservice.getToken();
  if (!token) {
    throw new Error('El usuario no se encuentra logueado en estos momentos');
  }
  return this.http.put(`${this.url}/desvincular/${email}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    responseType: 'text'
  });
}


   */

  public desvincular(email: string): Observable<string> {
    return this.http.put(`${this.url}/desvincular/${email}`, {}, { responseType: 'text' });
  }


}
