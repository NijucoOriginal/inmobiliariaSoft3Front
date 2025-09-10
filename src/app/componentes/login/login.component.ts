import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import {AuthService} from '../../servicios/auth.service';
import { NgIf } from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, MessageModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = null;
      const { email, contrasena } = this.loginForm.value;
      this.authService.login(email, contrasena).subscribe({
        next: () => {
          this.loading = false;
          let home;
          if (this.authService.getRoles().includes('AGENTE'))
          {
            home = '/ventanaAgente';
          } else if (this.authService.getRoles().includes('ASESOR'))
          {
            home = '/ventanaAsesor';
          } else if (this.authService.getRoles().includes('CLIENTE'))
          {
            home = '/ventanaUsuario';
          }
          this.router.navigate([home]).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.message || 'Error desconocido';
        }
      });
    }
  }
}