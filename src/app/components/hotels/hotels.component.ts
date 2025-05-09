import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HotelsService } from '../../services/hotels.service';
import { BuscadorComponent } from "../buscador/buscador.component";
import { Hotel } from '../../models/hotels';

@Component({
  selector: 'app-hotels',
  imports: [MatCardModule, MatButtonModule, BuscadorComponent],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css',
})
export class HotelsComponent {
  hotels: Hotel[] = [];

  constructor(public hotelsService: HotelsService) { }

  ngOnInit() {
    this.hotelsService._hotelsObs.subscribe((hotels) => {
      this.hotels = hotels;
    });
    this.hotelsService.getHotelsBusqueda("");
  
  }

  actualizarHotelList(pattern: string): void {
    this.hotelsService.getHotelsBusqueda(pattern);
  }
}
