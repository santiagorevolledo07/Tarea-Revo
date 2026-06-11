import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../services/persona.service';
import { Persona, CanalContacto } from '../../models/persona.model';

@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './persona-form.component.html'
})
export class PersonaFormComponent implements OnInit {
  persona: Persona = {
    Nombre: '',
    Apellido: '',
    Edad: 0,
    Correo: '',
    CanalId: undefined // Inicializado vacío
  };
  editMode: boolean = false;
  canales: CanalContacto[] = []; // Lista de canales disponibles

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1. Cargar canales de la base de datos al inicializar
    this.personaService.getCanalesContacto().subscribe(data => {
      this.canales = data;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.personaService.getPersona(+id).subscribe(data => {
        this.persona = data;
      });
    }
  }

  savePersona(): void {
    if (this.editMode && this.persona.Id) {
      this.personaService.updatePersona(this.persona.Id, this.persona).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.personaService.createPersona(this.persona).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
