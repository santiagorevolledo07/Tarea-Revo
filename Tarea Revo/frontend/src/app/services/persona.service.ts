import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona, CanalContacto } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'http://localhost:3001/api/personas';

  constructor(private http: HttpClient) { }

  // 1. Obtener lista de Canales
  getCanalesContacto(): Observable<CanalContacto[]> {
    return this.http.get<CanalContacto[]>(`${this.apiUrl}/canales-contacto`);
  }

  // Métodos anteriores
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  getPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }

  createPersona(persona: Persona): Observable<any> {
    return this.http.post(this.apiUrl, persona);
  }

  updatePersona(id: number, persona: Persona): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, persona);
  }

  deletePersona(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
