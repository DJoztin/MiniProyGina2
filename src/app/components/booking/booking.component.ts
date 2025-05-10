import { Component } from '@angular/core';
import { HotelsService } from '../../services/hotels.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  hotel: any;
  hoteles: any[] = [];
  total = 0;
  reserva = {
    nombre: '',
    email: '',
    telefono: '',
    fechaEntrada: '',
    fechaSalida: '',
    noches: 1,
    hotel: ''
  };


  constructor(public hotelsService: HotelsService, public bookingService: BookingService, public activatedRoute: ActivatedRoute,) {
    let nombreHotel = this.activatedRoute.snapshot.paramMap.get('hotelName');

    this.hotelsService.getHotels().subscribe((data: any) => {
      this.hoteles = data;
      this.hotel = this.hoteles.find(h => h.nombre === nombreHotel);
      this.total = this.hotel.precio;
      this.reserva.hotel = this.hotel.nombre;
    });
  }

  agregarNoche(): void {
    this.reserva.noches++;
    this.total += this.hotel.precio;
  }


  quitarNoche(): void {
    if (this.reserva.noches == 1) return;
    this.reserva.noches--;
    this.total -= this.hotel.precio;
  }

  reservar() {
    console.log(this.reserva);
    this.bookingService.agregarReserva(this.reserva);
  }

}
