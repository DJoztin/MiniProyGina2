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
    // Sacar el id del componente que sera = el ultimo id que se tiene + 1
    reserva.id = (this.reservas.length === 0) ? 1 : this.reservas[this.reservas.length - 1].id + 1;
    this.reservas.push(reserva);
    this.saveToLocalStorage();
  }

  editReserva(reserva: Reservation): void{
    // Encontrar el objeto que se edito
    const index = this.reservas.findIndex(rsv => rsv.id === reserva.id);
    this.reservas[index] = reserva;
    this.saveToLocalStorage();
  }
  
  deleteReserva(idReserva: number): boolean{
    const index = this.reservas.findIndex(rsv => rsv.id === idReserva);
    if(index != -1){
      this.reservas.splice(index,1);
      this.saveToLocalStorage();
      return true;
    } else{
      // Si no existe la reserva develve false de que hubo error
      return false;
    }
  }

  saveToLocalStorage(): void{
      localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }
}
