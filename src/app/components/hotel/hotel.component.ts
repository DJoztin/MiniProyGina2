import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Hotel } from '../../models/hotels';
import { HotelsService } from '../../services/hotels.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BookingService } from '../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../../models/reservation';
import { FormReservacionComponent } from "../form-reservacion/form-reservacion.component";

@Component({
  selector: 'app-hotel',
  imports: [
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormReservacionComponent
],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css',
})
export class HotelComponent {
  hotel!: Hotel;

  constructor(
    public hotelsService: HotelsService,
    public bookingService: BookingService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.hotel = this.hotelsService.getHotel(params['id']);
    });
  }

  reservar(reservation: Reservation) {
    // Agregar el hotel a la reservation
    reservation.hotel = this.hotel.nombre;
    // TODO: tratar bien la date para que se guarde lindo en el localstorage
    this.bookingService.agregarReserva(reservation);
    // Limpiar los valores q se tenian
  }


}
