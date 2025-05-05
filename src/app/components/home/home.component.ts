import { Component } from '@angular/core';
import { HotelsComponent } from "../hotels/hotels.component";
import { CarouselComponent } from '../carousel/carousel.component';
import { AboutUsComponent } from "../about-us/about-us.component";

@Component({
  selector: 'app-home',
  imports: [HotelsComponent, CarouselComponent, AboutUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
