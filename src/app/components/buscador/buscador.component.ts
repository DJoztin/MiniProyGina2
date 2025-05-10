import { Component, EventEmitter, Output, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buscador',
  imports: [FontAwesomeModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  @Output() nuevaBusqueda = new EventEmitter<string>();
  faSeach = faMagnifyingGlass
  busqueda(textoBusqueda:string){
    this.nuevaBusqueda.emit(textoBusqueda);
  }
}
