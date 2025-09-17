import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponse} from '../dto/user-response';
import {UserRegistrationRequest} from '../dto/user-registration-request';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "https://backend-eden.onrender.com/api/usuarios";
  constructor(private http: HttpClient) {}

  public registrar(user: UserRegistrationRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.url}`, user);
  }


}
