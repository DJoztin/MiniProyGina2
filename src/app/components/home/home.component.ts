import { Component } from '@angular/core';
import { HotelsComponent } from "../hotels/hotels.component";

@Component({
  selector: 'app-home',
  imports: [HotelsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
