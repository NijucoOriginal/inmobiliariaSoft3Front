export interface CaptacionInmuebleDTO {

  departamento: string,
  tipoNegocio: string,
  nombreAgente: string,
  tipoInmueble: string,
  medidas: number,
  habitaciones: number,
  banos: number,
  descripcion: string,
  estado: string,
  precio: number,
  ciudad: string,
  cantidadParqueaderos: number,
  telefonoContacto: string,
  nombreContacto: string,
  correoContacto: string,
  imagenes: File[],
  estrato: number

  /*Los siguientes datos seran determinados en el back-end:
    --Los datos del agente inmobiliario
    --Historial inmueble
    --Los datos del asesor legal

    Los siguientes datos seran determinados con el agente inmobiliario via whatsapp:
    --Documentos improtantes
   */
}
