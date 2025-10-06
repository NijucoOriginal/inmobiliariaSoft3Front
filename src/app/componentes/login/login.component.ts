import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import {AuthService} from '../../servicios/auth.service';
import {NgClass, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, MessageModule, NgIf, RouterLink, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;
  verContra = false;
  verConfirmContra = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Formulario enviado:', this.loginForm.value);
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = null;
      const { email, contrasena } = this.loginForm.value;
      this.authService.login(email, contrasena).subscribe({
        next: (response) => {
          console.log('Respuesta del backend:', response);
          this.loading = false;
          this.router.navigate(['/inicio']); // Navega a la vista protegida de usuario autenticado
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.loading = false;
          this.errorMessage = err.message || 'Error desconocido';
        }
      });
    } else {
      console.warn('Formulario inválido:', this.loginForm);
    }
  }

  mostrarContrasenia() {
    this.verContra = !this.verContra;
  }

  mostrarConfirmContrasenia() {
    this.verConfirmContra=!this.verConfirmContra;
  }

}
