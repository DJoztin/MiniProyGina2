import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { AboutUsComponent } from "../about-us/about-us.component";

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, AboutUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
