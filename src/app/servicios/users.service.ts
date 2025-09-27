import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponse} from '../dto/user-response';
import {UserRegistrationRequest} from '../dto/user-registration-request';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "https://inmobiliariasoft3back2-0.onrender.com/api/usuarios";
  //private url='http://localhost:8080/api/usuarios' commit prueba 2.0;
  constructor(private http: HttpClient) {}

  public registrar(user: UserRegistrationRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.url}`, user);
  }


}
