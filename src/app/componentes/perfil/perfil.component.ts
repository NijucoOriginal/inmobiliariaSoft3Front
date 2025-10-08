import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import {CommonModule, NgClass} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsersService} from '../../servicios/users.service';
import {Router} from '@angular/router';
import {RedireccionService} from '../../servicios/redireccion.service';

@Component({
  selector: 'app-perfil',
  imports: [
    NgClass,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  perfilForm!: FormGroup;
  email = 'correoUsuario';
  nombre = 'Nombre Usuario';
  apellido = 'Apellido Usuario';
  documentoIdentidad = '12345678';
  telefono = '1234567890'
  rol = 'USUARIO';
  id = '1';
  editando = false;

  nombreTemporal = '';
  emailTemporal = '';
  telefonoTemporal = '';
  apellidoTemporal = '';
  documentoIdentidadTemporal = '';

  errorMessage: string | null = null;
  loading: boolean = false;


  constructor(private authService: AuthService,private userService:UsersService, private fb: FormBuilder,private redireccionamiento: RedireccionService) {
    this.email = this.authService.getUserEmail() || 'correoUsuario';
    this.nombre = this.authService.obtenerNombreUsuario() || 'Nombre Usuario';
    this.apellido = this.authService.obtenerApellidoUsuario() || 'Apellido Usuario';
    this.telefono = this.authService.obtenerTelefonoUsuario() || '1234567890';
    this.rol = this.authService.getRoles()[0] || 'USUARIO';
    this.documentoIdentidad = this.authService.obtenerDocumentoUsuario() || '12345678';

    this.perfilForm = this.fb.group({
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      documentoIdentidad: ['',[Validators.required]]
    })
  }

  propiedades = [
    {
      titulo: 'Casa campestre en Armenia',
      tipo: 'VENTA',
      imagen: 'https://images.unsplash.com/photo-1560184897-d4fd4d1e3d99?w=800'
    },
    {
      titulo: 'Apartamento moderno',
      tipo: 'ALQUILER',
      imagen: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800'
    }
  ];



  activarEdicion() {
    this.editando = true;
    this.nombreTemporal = this.nombre;
    this.apellidoTemporal = this.apellido;
    this.emailTemporal = this.email;
    this.telefonoTemporal = this.telefono;
    this.documentoIdentidadTemporal = this.documentoIdentidad;
  }

  guardarCambios() {
    this.nombre = this.nombreTemporal;
    this.apellido = this.apellidoTemporal;
    this.email = this.emailTemporal;
    this.telefono = this.telefonoTemporal;
    this.documentoIdentidad = this.documentoIdentidadTemporal;
    this.editando = false;

    console.log('Información actualizada:', {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.email,
      telefono: this.telefono,
      documento: this.documentoIdentidad
    });
  }

  cancelarEdicion() {
    // Restaurar y salir del modo edición
    this.editando = false;
  }

  desvincularEmpresa() {
    console.log('Formulario enviado:', this.perfilForm.value);
    this.userService.desvincular(this.email).subscribe({
      next: (response) => {
          console.log('Respuesta del backend:', response);
          this.loading = false;
          alert('Usuario desvinculado de la empresa exitosamente.');
          this.redireccionamiento.redirigirAHome();
        },
      error: (err) => {
          console.error('Error al desvincular usuario:', err);
          this.loading = false;
          this.errorMessage = err.message || 'Error desconocido';
        }
      }

    )
  }


}
