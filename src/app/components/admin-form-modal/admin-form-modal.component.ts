import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-form-modal',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './admin-form-modal.component.html',
  styleUrl: './admin-form-modal.component.css'
})
export class AdminFormModalComponent {
  type: 'reserv' | 'item';
  data: any; // null si es nuevo, objeto si es edición

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<AdminFormModalComponent>) {
    this.type = dialogData.type;
    this.data = dialogData.data;
  }

  onSubmit(result: any) {
    this.dialogRef.close(result);
  }
}

