import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormReservacionComponent } from "../form-reservacion/form-reservacion.component";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-admin-form-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    FormReservacionComponent,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  templateUrl: './admin-form-modal.component.html',
  styleUrl: './admin-form-modal.component.css',
  providers: [provideNativeDateAdapter()] 
})
export class AdminFormModalComponent {
  type: 'reserv' | 'item';
  data: any; // null si es nuevo, objeto o reservacion si es edición
  title!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<AdminFormModalComponent>) {
    this.type = dialogData.type;
    this.data = dialogData.data;
    this.title = (this.data) ? "Editando registro" : "Añadiendo nuevo registro";
  }

  // El resultado obtenido es el nuevo objeto reservacion o objetoPerdido
  onSubmit(result: any) {
    // TODO: Deberiamos hacer una validacion si el hotel ingresado es valido, ekis for the moment
    this.dialogRef.close(result);
  }
}

