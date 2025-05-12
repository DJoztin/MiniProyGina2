import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() title: string = "Solicitar ticket";
  @Input() data: any;
  @Input() isOnAdminPanel: boolean = false;
  @Output() sendForm: EventEmitter<Objeto> = new EventEmitter<Objeto>;

  objeto!: Objeto;
  form: FormGroup;
  tipos = ['Documento', 'Llaves', 'Celular', 'Ropa', 'Otro'];
  lost: string = 'assets/img/lost.webp';



  constructor(private fb: FormBuilder, private extraviosService: ExtraviosService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      ubicacion: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      fecha: ['', [Validators.required, fechaNoPasadaValidator, fechaPasadaValidator]],
      tipo: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(150)]],
      aceptarTerminos: [false, Validators.requiredTrue]

    });
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      // Edicion, se llena los datos que ya estaban
      this.form.patchValue({
        email: this.data.email,
        ubicacion: this.data.ubicacion,
        fecha: this.data.fecha,
        tipo: this.data.tipo,
        descripcion: this.data.descripcion,
        aceptarTerminos: this.data.aceptarTerminos,
      })

    } else {
      // Si esta creando desde 0, se manda a llamar al servicio
      this.objeto = this.extraviosService.nuevoObjeto();
    }

  }

  nuevoObjeto(): void {
    if (this.form.valid) {
      const objetoForm = this.form.value;
      const fecha = objetoForm.fecha instanceof Date
        ? objetoForm.fecha.toISOString().split('T')[0]
        : objetoForm.fecha;

      // No preguntes solo Gozalo
      //  Ntc, primero, si estaba editando solo agarra el id que ya tenia, si es nuevo y es el primer elemento en el localStorage
      //  agarra el id uno, si es nuevo y no es el primer elemento agarra el id mayor del local y le suma 1
      objetoForm.id = (!this.data) ? this.extraviosService.obtenerObjetos().length > 0
        ? Math.max(...this.extraviosService.obtenerObjetos().map(o => o.id)) + 1
        : 1 : this.data.id;
      objetoForm.fecha = fecha;
      Swal.fire({
        title: '¡Éxito!',
        color: '#f0f0f0',
        background: '#2d2d2d',
        text: 'Su ticket ha sido registrado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.form.reset();
      if (!this.isOnAdminPanel) {
        // Si no esta en el admin panel manda llamar al servicio nomral, si esta en admin se manda el output
        this.extraviosService.agregarObjeto(objetoForm);
      } else {
        this.sendForm.emit(objetoForm);
      }
    }
  }



}

export function fechaNoPasadaValidator(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;

  const fechaIngresada = new Date(valor);
  const semanaAtras = new Date();
  const semanaDelante = new Date();
  semanaDelante.setDate(semanaDelante.getDate() + 1);
  semanaAtras.setDate(semanaAtras.getDate() - 7);
  semanaAtras.setHours(0, 0, 0, 0);
  semanaDelante.setHours(0, 0, 0, 0);
  // Compara la fecha ingresada con la fecha actual
  // Si la fecha ingresada es menor a la fecha actual, entonces es una fecha pasada
  if (fechaIngresada < semanaAtras) {
    return { fechaNoPasada: true };
  }
  return null;

 

}

export function fechaPasadaValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
  if (!valor) return null;

  const fechaIngresada = new Date(valor);
  const semanaDelante = new Date();
  ;
  semanaDelante.setHours(0, 0, 0, 0);
  // Compara la fecha ingresada con la fecha actual
  // Si la fecha ingresada es menor a la fecha actual, entonces es una fecha pasada
  if (fechaIngresada > semanaDelante) {
    return { fechaPasada: true };
  }
  return null;

}