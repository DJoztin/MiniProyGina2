import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { AboutUsComponent } from "../about-us/about-us.component";
import { BestHotelsComponent } from "../best-hotels/best-hotels.component";

@Component({
  selector: 'app-home',
  imports: [ CarouselComponent, AboutUsComponent, BestHotelsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
