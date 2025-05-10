import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Objeto } from '../models/objetos';
import { ExtraviosService } from '../services/extravios.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-extravios',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule ],
  templateUrl: './extravios.component.html',
  styleUrl: './extravios.component.css'
})
export class ExtraviosComponent {
  objeto!: Objeto;
  form: FormGroup;
  tipos = ['Documento', 'Llaves', 'Celular', 'Ropa', 'Otro'];

  constructor(private fb: FormBuilder ,private extraviosService: ExtraviosService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      ubicacion: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      fecha: ['', [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')]],
      tipo: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(150)]],
    }); 
  }

  ngOnInit() {
    this.objeto = this.extraviosService.nuevoObjeto(this.objeto);
  }

  nuevoObjeto(): void {
    this.extraviosService.agregarObjeto(this.objeto);
    this.objeto = this.extraviosService.nuevoObjeto(this.objeto);
  }
}
