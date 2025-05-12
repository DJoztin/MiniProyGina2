import { Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
} from '@angular/material/card';

@Component({
  selector: 'app-credits',
  imports: [MatCard, MatCardContent],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css',
})
export class CreditsComponent {
  equipo = [
    {
      nombre: 'Sergio Eder Servantes Rincón',
      id: '232682',
      foto: 'assets/img/integrantes/sergio.png',
    },
    {
      nombre: 'Daan Jostin Carabez García',
      id: '267187',
      foto: 'assets/img/integrantes/jostin.jpeg',
    },
    {
      nombre: 'Luis David Flores Martínez',
      id: '348961',
      foto: 'assets/img/integrantes/luis.jpeg',
    },
    {
      nombre: 'Diego Iván Salas Pedroza',
      id: '281435',
      foto: 'assets/img/integrantes/diego.jpeg',
    },
  ];
}
