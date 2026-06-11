export interface Persona {
  Id?: number;
  Nombre: string;
  Apellido: string;
  Edad: number;
  Correo: string;
  // Campos nuevos para el Canal
  CanalId?: number;
  CanalNombre?: string;
}

export interface CanalContacto {
  Id: number;
  Nombre: string;
}
