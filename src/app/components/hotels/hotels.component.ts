import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HotelsService } from '../../services/hotels.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotels',
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css',
})
export class HotelsComponent {
  hotels: any[] = [];
  constructor(public hotelsService: HotelsService) {}

  ngOnInit() {
    this.hotelsService.getHotels().subscribe((data: any) => {
      this.hotels = data;
    });
  }
}
