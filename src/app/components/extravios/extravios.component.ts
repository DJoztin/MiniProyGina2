import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core'; 
import { MatIconModule } from '@angular/material/icon';

import { Objeto } from '../../models/objetos';
import { ExtraviosService } from '../../services/extravios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-extravios',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './extravios.component.html',
  styleUrls: ['./extravios.component.css']
})
export class ExtraviosComponent {
  objeto!: Objeto;
  form: FormGroup;
  tipos = ['Documento', 'Llaves', 'Celular', 'Ropa', 'Otro'];
  lost: string = 'assets/img/lost.webp';
  constructor(private fb: FormBuilder, private extraviosService: ExtraviosService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      ubicacion: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      fecha: ['', [Validators.required, fechaNoPasadaValidator]],
      tipo: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(150)]],
      aceptarTerminos: [false, Validators.requiredTrue]

    });
  }

  ngOnInit() {
    this.objeto = this.extraviosService.nuevoObjeto();
  }

  nuevoObjeto(): void {
      if (this.form.valid) {
        const objetoForm = this.form.value;
        const fecha = objetoForm.fecha instanceof Date
        ? objetoForm.fecha.toISOString().split('T')[0]
        : objetoForm.fecha;
        const nuevoId = this.extraviosService.obtenerObjetos().length > 0
        ? Math.max(...this.extraviosService.obtenerObjetos().map(o => o.id)) + 1
        : 1;
        objetoForm.id = nuevoId;
        objetoForm.fecha = fecha;
        this.extraviosService.agregarObjeto(objetoForm);
        Swal.fire({
          title: '¡Éxito!',
          color: '#f0f0f0',
          background: '#2d2d2d',
          text: 'Su ticket ha sido registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.form.reset();
      }
  }


  
}

export function fechaNoPasadaValidator(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;

  const fechaIngresada = new Date(valor);
  const semanaAtras = new Date();
  semanaAtras.setDate(semanaAtras.getDate() - 7);
  semanaAtras.setHours(0, 0, 0, 0);

  return fechaIngresada < semanaAtras ? { fechaPasada: true } : null;
}