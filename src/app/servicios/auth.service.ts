import { Injectable } from '@angular/core';
import {catchError, Observable, tap, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LoginRequest} from '../dto/login-request';
import {TokenResponse} from '../dto/token-response';
import {ErrorResponse} from '../dto/error-response';
import { RedireccionService } from './redireccion.service';
import { jwtDecode } from 'jwt-decode';

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
  constructor(private http: HttpClient, private redireccionService: RedireccionService) {}

  /**
   * Envía las credenciales al backend y almacena el token.
   * @param email Nombre de usuario o correo
   * @param contrasena Contraseña
   * @returns Observable con la respuesta del servidor
   */
  login(email: string, contrasena: string): Observable<TokenResponse> {
    const urlLogin = `${this.url}/login`;
    // Usar los nombres de campos que espera el backend
    const request = { email: email, contrasena: contrasena };
    return this.http.post<TokenResponse>(urlLogin, request).pipe(
      tap(response => {
        const tokenDecodificado: any=jwtDecode(response.token);
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.TOKEN_TYPE_KEY, tokenDecodificado.type);
        localStorage.setItem(this.EXPIRE_AT_KEY, tokenDecodificado.exp);
        localStorage.setItem(this.ROLES_KEY, JSON.stringify(tokenDecodificado.rol));
        localStorage.setItem(this.USER_EMAIL_KEY, email); // Almacenar el email

        // Delegar redirección al servicio de redirección
        this.redireccionService.redirigirSegunRol(tokenDecodificado.rol);
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
   * Si el token está corrupto o expirado, lo elimina automáticamente
   */
  isAuthenticated(): boolean {
    const expireAt = localStorage.getItem(this.EXPIRE_AT_KEY);
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!expireAt || !token) {
      this.logout(); // Limpia cualquier estado inconsistente
      return false;
    }
    const expireDate = new Date(expireAt);
    if (expireDate <= new Date()) {
      this.logout(); // Token expirado, limpiar
      return false;
    }
    return true;
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
    if (!roles || roles === "undefined") {
      return [];
    }
    try {
      return JSON.parse(roles);
    } catch (e) {
      return [];
    }
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.USER_EMAIL_KEY);
  }

  /**
   * Decodifica el token JWT para extraer información como roles.
   * @returns Roles extraídos del token o un arreglo vacío si el token es inválido.
   */
  decodeTokenRoles(): string[] {
    const token = this.getToken();
    if (!token) {
      return [];
    }
    try {
      const decoded: any = jwtDecode(token);
      return decoded.rol ? [decoded.rol] : [];
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return [];
    }
  }
}
