import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../mapa.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroInmuebleService } from '../../servicios/registro-inmueble.service';
import { RegistroInmuebleRequest } from '../../dto/registro-inmueble-request';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-inmueble',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './registro-inmueble.component.html',
  styleUrl: './registro-inmueble.component.css'
})
export class RegistroInmuebleComponent implements OnInit {
  registroInmuebleForm!: FormGroup;
  imagenesUrls: string[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private mapaService: MapaService,
    private registroInmuebleService: RegistroInmuebleService,
    private router: Router
  ) {
    this.crearFormularioTexto();
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();

    this.mapaService['mapa'].on('click', (event: any) => {
      const { lng, lat } = event.lngLat;
      this.mapaService.agregarMarcador();

      const ubicacionGroup = this.registroInmuebleForm.get('ubicacion');
      if (ubicacionGroup) {
        ubicacionGroup.setValue({ latitud: lat, longitud: lng });
      }
    });
  }

  private crearFormularioTexto() {
    this.registroInmuebleForm = this.formBuilder.group({
      tipoNegocio: ['', [Validators.required]],
      tipoInmueble: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(1)]],
      estrato: ['', [Validators.required]],
      estadoinmueble: ['', [Validators.required]],
      habitaciones: ['', [Validators.required, Validators.min(0)]],
      banos: ['', [Validators.required, Validators.min(0)]],
      parqueaderos: ['', [Validators.required, Validators.min(0)]],
      medidas: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      departamento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      nuevaImagenUrl: [''],
      ubicacion: this.formBuilder.group({
        latitud: [null, [Validators.required]],
        longitud: [null, [Validators.required]]
      })
    });
  }

  agregarImagenUrl() {
    const url = this.registroInmuebleForm.get('nuevaImagenUrl')?.value;
    if (url && url.trim() !== '') {
      if (url.length > 255) {
        alert('La URL de la imagen es demasiado larga. Por favor use una URL más corta (máximo 255 caracteres).');
        return;
      }
      this.imagenesUrls.push(url);
      this.registroInmuebleForm.get('nuevaImagenUrl')?.setValue('');
    }
  }

  eliminarImagenUrl(index: number) {
    this.imagenesUrls.splice(index, 1);
  }

  onSubmit() {
    if (this.registroInmuebleForm.valid && this.imagenesUrls.length > 0) {
      console.log('Form values:', this.registroInmuebleForm.value);
      const formValue = this.registroInmuebleForm.value;
      
      // Check if location is set
      if (!formValue.ubicacion || !formValue.ubicacion.latitud || !formValue.ubicacion.longitud) {
        alert('Por favor haga clic en el mapa para establecer la ubicación del inmueble');
        return;
      }
      
      // Validate image URLs length
      for (const url of this.imagenesUrls) {
        if (url.length > 255) {
          alert('Una de las URLs de las imágenes es demasiado larga. Por favor revise las URLs.');
          return;
        }
      }
      
      const request: RegistroInmuebleRequest = {
        departamento: formValue.departamento,
        ciudad: formValue.ciudad,
        ubicacion: {
          latitud: formValue.ubicacion.latitud,
          longitud: formValue.ubicacion.longitud
        },
        tipoNegocio: formValue.tipoNegocio.toUpperCase(),
        tipo: formValue.tipoInmueble.toUpperCase(),
        medidas: formValue.medidas,
        habitaciones: formValue.habitaciones,
        banos: formValue.banos,
        descripcion: formValue.descripcion,
        precio: formValue.precio,
        cantidadParqueaderos: formValue.parqueaderos,
        telfonoContacto: formValue.telefono,
        nombreContacto: formValue.nombre,
        correoContacto: formValue.email,
        imagenes: this.imagenesUrls
      };

      console.log('Sending request:', request);

      this.registroInmuebleService.registrarInmueble(request).subscribe({
        next: (response) => {
          console.log('Inmueble registrado exitosamente', response);
          alert('Inmueble registrado exitosamente');
          this.router.navigate(['/inicio']);
        },
        error: (error) => {
          console.error('Error registrando inmueble', error);
          if (error.status === 401) {
            alert('No estás autorizado para realizar esta acción. Por favor, inicia sesión.');
            this.router.navigate(['/login']);
          } else if (error.error?.message && error.error.message.includes('value too long')) {
            alert('Una de las URLs de las imágenes es demasiado larga. Por favor use URLs más cortas (máximo 255 caracteres).');
          } else {
            alert('Error registrando inmueble: ' + (error.error?.message || 'Error desconocido'));
          }
        }
      });
    } else {
      console.log('Form invalid or no images. Form errors:', this.registroInmuebleForm.errors);
      console.log('Telefono value:', this.registroInmuebleForm.get('telefono')?.value);
      console.log('Form status:', this.registroInmuebleForm.status);
      console.log('Form touched:', this.registroInmuebleForm.touched);
      
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.registroInmuebleForm);
      
      if (this.imagenesUrls.length === 0) {
        alert('Debe agregar al menos una imagen URL');
      } else {
        alert('Por favor complete todos los campos requeridos');
      }
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        } else {
          control.markAsTouched();
        }
      }
    });
  }
}