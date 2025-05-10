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
  ],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css',
})
export class HotelComponent {
  hotel!: Hotel;
  reserva: Reservation = {
    id: 0,
    nombre: '',
    email: '',
    fechaEntrada: '',
    fechaSalida: '',
    hotel: ''
  };
  constructor(
    public hotelsService: HotelsService,
    public bookingService: BookingService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.hotel = this.hotelsService.getHotel(params['id']);
      this.reserva.hotel = this.hotel.nombre;
    });
  }

  reservar() {
    // TODO: tratar bien la date para que se guarde lindo en el localstorage
    this.bookingService.agregarReserva(this.reserva);
  }
}
