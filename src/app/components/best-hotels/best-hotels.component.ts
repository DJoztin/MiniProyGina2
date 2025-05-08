import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HotelsService } from '../../services/hotels.service';
import { Hotel } from '../../models/hotels';

@Component({
  selector: 'app-best-hotels',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './best-hotels.component.html',
  styleUrl: './best-hotels.component.css'
})
export class BestHotelsComponent {
  bestHotels!: Hotel[];
  constructor(public hotelsService: HotelsService) {}
  
  ngOnInit() {
    this.hotelsService._hotelsObs.subscribe(() => {
      this.bestHotels = this.hotelsService.getBestHotels();
    });
  }
}




