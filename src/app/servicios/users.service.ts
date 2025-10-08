import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponse} from '../dto/user-response';
import {UserRegistrationRequest} from '../dto/user-registration-request';
import {DesvincularRequestDto} from '../dto/desvincular-request-dto';
import {User} from '../modelo/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //private url = "https://inmobiliariasoft3back2-0.onrender.com/api/usuarios";
  private url='http://localhost:8080/api/usuarios';
  constructor(private http: HttpClient) {}

  public registrar(user: UserRegistrationRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.url}`, user);
  }

  public desvincular(email: string): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.url}/desvincular/${email}`, {});
  }





}
