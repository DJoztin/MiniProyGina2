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
    descripcion: 'El motor técnico del equipo. Siempre va un paso adelante implementando nuevas funciones, resolviendo bugs o proponiendo soluciones. Si algo no compila, seguro ya lo está arreglando. Responsable, directo y con enfoque de “vamos a terminar esto bien".',
    foto: 'assets/img/integrantes/sergio.png',
  },
  {
    nombre: 'Daan Jostin Carabez García',
    id: '267187',
    descripcion: 'El visual del grupo. Siempre atento al diseño, la estética y que todo se vea bien. Colaboración en código, pero su toque está en que todo quede bonito. Tiene ojo para lo que falta y no se le pasa ningún detalle en la interfaz.',
    foto: 'assets/img/integrantes/jostin.jpeg',
  },
  {
    nombre: 'Luis David Flores Martínez',
    id: '348961',
    descripcion: 'El organizador.Controla los documentos y hace que todo esté en orden. Cuando habla es porque ya solucionó lo que los demás estaban discutiendo. El pegamento del equipo.',
    foto: 'assets/img/integrantes/luis.jpeg',
  },
  {
    nombre: 'Diego Iván Salas Pedroza',
    id: '281435',
    descripcion: 'El apoyo confiable. Está presente cuando se necesita, ya sea para revisar tareas, subir avances o cerrar detalles. Dispuesto a colaborar donde haga falta, sin perder el ritmo del equipo.',
    foto: 'assets/img/integrantes/diego.jpeg',
  },
];
}
