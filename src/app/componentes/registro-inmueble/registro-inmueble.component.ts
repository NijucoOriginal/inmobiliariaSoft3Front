import {Component, OnInit} from '@angular/core';
import {MapaService} from '../../mapa.service';
import {FormBuilder, FormGroup, isFormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsersService} from '../../servicios/users.service';
import {RegistroInmuebleRequest} from '../../dto/registro-inmueble-request';

@Component({
  selector: 'app-registro-inmueble',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './registro-inmueble.component.html',
  styleUrl: './registro-inmueble.component.css'
})
export class RegistroInmuebleComponent implements OnInit{
  registroInmuebleForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private mapaService: MapaService) {
    this.crearFormularioTexto();
  }

  //Revisar si funciona
  ngOnInit(): void {
    this.mapaService.crearMapa();


    this.mapaService['mapa'].on('click', (event: any) => {
      const { lng, lat } = event.lngLat;
      this.mapaService.agregarMarcador();

      this.registroInmuebleForm.get('ubicacion')?.setValue({ latitud: lat, longitud: lng });
    });
  }

  //Modificar despues xd
  private crearFormularioTexto() {
    this.registroInmuebleForm = this.formBuilder.group({
      tipoNegocio: ['', [Validators.required]],
      tipoInmueble: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      Estrato: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      terminosycondiciones: [false, [Validators.requiredTrue]],
      recibirPromociones: [false, [Validators.requiredTrue]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
      ubicacion: this.formBuilder.group({
        latitud: [''],
        longitud: ['']
      })
    });
  }

  onSubmit() {

  }


}



