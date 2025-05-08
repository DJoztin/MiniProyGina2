import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-hotels',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css',
})
export class HotelsComponent {
  hotels: any[] = [];
  constructor(public hotelsService: HotelsService) {}

  ngOnInit() {
    this.hotelsService._hotelsObs.subscribe((hotels) => {
      this.hotels = hotels;
    });
  }
}
