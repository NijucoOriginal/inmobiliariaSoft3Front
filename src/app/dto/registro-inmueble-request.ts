export interface RegistroInmuebleRequest {
  departamento: string;
  ciudad: string;
  ubicacion: {
    latitud: number;
    longitud: number;
  };
  tipoNegocio: string;
  tipo: string;
  medidas: number;
  habitaciones: number;
  banos: number;
  descripcion: string;
  precio: number;
  cantidadParqueaderos: number;
  telfonoContacto: string;
  nombreContacto: string;
  correoContacto: string;
  imagenes: string[];
}