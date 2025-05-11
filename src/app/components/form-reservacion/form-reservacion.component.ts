import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Reservation } from '../../models/reservation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-reservacion',
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './form-reservacion.component.html',
  styleUrl: './form-reservacion.component.css'
})
export class FormReservacionComponent {
  @Input() title: string = '';
  @Output() sendForm: EventEmitter<Reservation> = new EventEmitter<Reservation>;
  nombre: string = "";
  email: string = "";
  fechaEntrada: string = "";
  fechaSalida: string = "";


  confirmarReserva(): void {
    if (!this.nombre || !this.fechaEntrada || !this.fechaSalida || !this.email) {
      Swal.fire('Por favor, complete todos los campos: Nombre, email, Fecha de Entrada y Fecha de Salida.');
      return;
    }
    Swal.fire({
      title: "Confirmar Reserva",
      text: "Seguro que quieres reservar tu habitacion?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then(result => {
      if (result.isConfirmed) {
        // Emite un objeto reservation sin hotel ni id
        let reservation: Reservation = {
          nombre: this.nombre,
          email: this.email,
          fechaEntrada: this.fechaEntrada,
          fechaSalida: this.fechaSalida,
          id: 0,
          hotel: ""
        };
        this.sendForm.emit(reservation)
        this.clearForm();
      }
    })

  }

  clearForm(): void {
    this.nombre= "";
    this.email= "";
    this.fechaEntrada= "";
    this.fechaSalida= "";
  }
}
