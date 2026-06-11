import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './persona-list.component.html'
})
export class PersonaListComponent implements OnInit {
  personas: Persona[] = [];

  constructor(
    private personaService: PersonaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personaService.getPersonas().subscribe({
      next: (data) => {
        console.log('Datos recibidos del servidor:', data);
        this.personas = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar personas:', err);
      }
    });
  }

  deletePersona(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de eliminar esta persona?')) {
      this.personaService.deletePersona(id).subscribe(() => {
        this.loadPersonas();
      });
    }
  }
}
