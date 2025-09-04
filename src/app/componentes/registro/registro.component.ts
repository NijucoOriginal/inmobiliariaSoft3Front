import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {UserRegistrationRequest} from '../../dto/user-registration-request';
import {UsersService} from '../../servicios/users.service';
import {ErrorResponse} from '../../dto/error-response';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, NgIf, NgClass, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm!: FormGroup;
  result = '';
  classResult = 'success';

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        documentoIdentidad: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        terminosycondiciones: [false, [Validators.requiredTrue]],
        recibirPromociones: [false, [Validators.requiredTrue]],
        password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]]
      },
      {
        validators: this.passwordMatchValidator
      });
  }

  onSubmit(): void {
    const newUser = this.registroForm.value as UserRegistrationRequest;
    this.usersService.registrar(newUser).subscribe({
      next: ( data) => {
        console.log('El usuario ha sido creado correctamente: ', data);
        this.result = 'Usuario registrado correctamente';
        this.classResult = 'success';
      },
      error: (error) => {
        console.log('Se presentó un problema al registrar el usuario: ', error);
        if( error.error instanceof Array){
          this.result = error.error.map((item: ErrorResponse) => item.message).join(', ');
        } else {
          this.result = error.error.message;
        }
        this.classResult = 'text-danger';
      }
    });
  }

  passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
