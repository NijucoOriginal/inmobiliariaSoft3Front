import { Injectable } from '@angular/core';
import {catchError, Observable, tap, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LoginRequest} from '../dto/login-request';
import {TokenResponse} from '../dto/token-response';
import {ErrorResponse} from '../dto/error-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private url = "https://inmobiliariasoft3back2-0.onrender.com/api/auth/login";
  private url='http://localhost:8080/api/auth';
  private readonly TOKEN_KEY = 'authToken';
  private readonly TOKEN_TYPE_KEY = 'tokenType';
  private readonly EXPIRE_AT_KEY = 'expireAt';
  private readonly ROLES_KEY = 'roles';
  private readonly USER_EMAIL_KEY = 'userEmail';
  constructor(private http: HttpClient) {}

  /**
   * Envía las credenciales al backend y almacena el token.
   * @param email Nombre de usuario o correo
   * @param contrasena Contraseña
   * @returns Observable con la respuesta del servidor
   */
  login(email: string, contrasena: string): Observable<TokenResponse> {
    // Usar los nombres de campos que espera el backend
    const request = { email: email, contrasena: contrasena };
    return this.http.post<TokenResponse>(this.url, request).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.TOKEN_TYPE_KEY, response.type);
        localStorage.setItem(this.EXPIRE_AT_KEY, response.expireAt);
        localStorage.setItem(this.ROLES_KEY, JSON.stringify(response.roles));
        localStorage.setItem(this.USER_EMAIL_KEY, email); // Almacenar el email
      }),
      catchError(error => {
        let errorMsg = 'Error al iniciar sesión';
        if (error.status === 400 || error.status === 401) {
          const errorResponse: ErrorResponse = error.error;
          errorMsg = errorResponse.message || 'Credenciales inválidas';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }


  /**
   * Verifica si el usuario está autenticado y el token no ha expirado
   */
  isAuthenticated(): boolean {
    const expireAt = localStorage.getItem(this.EXPIRE_AT_KEY);
    if (!expireAt) {
      return false;
    }
    const expireDate = new Date(expireAt);
    return !!localStorage.getItem(this.TOKEN_KEY) && expireDate > new Date();
  }

  /**
   * Cierra la sesión
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_TYPE_KEY);
    localStorage.removeItem(this.EXPIRE_AT_KEY);
    localStorage.removeItem(this.ROLES_KEY);
    localStorage.removeItem(this.USER_EMAIL_KEY);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRoles() {
    const roles = localStorage.getItem(this.ROLES_KEY);
    return roles ? JSON.parse(roles) : [];
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.USER_EMAIL_KEY);
  }
}
