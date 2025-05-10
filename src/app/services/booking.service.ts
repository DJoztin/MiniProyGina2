import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  reservas: Reservation[] = [];
  constructor() { 
    this.reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  }

  getReservas(): Reservation[] {
    return this.reservas;
  }

  agregarReserva(reserva: Reservation): void {
    reserva.id = this.reservas.length + 1;
    this.reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }

}
