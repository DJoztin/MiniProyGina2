import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  reservas: any[] = [];
  constructor() { 
    this.reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  }

  getReservas() {
    return this.reservas;
  }

  agregarReserva(reserva: any) {
    this.reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }

}
