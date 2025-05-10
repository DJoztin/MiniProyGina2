import { Injectable } from '@angular/core';
import { Objeto } from '../models/objetos';

@Injectable({
  providedIn: 'root'
})
export class ExtraviosService {

  objetos!: Objeto[];


  constructor() {
    this.objetos = JSON.parse(localStorage.getItem('data') || '[]');
   }

   getObjetos(){
    return this.objetos;
   }

   agregarObjeto(objeto: Objeto){
    this.objetos.push(objeto);
    localStorage.setItem('data', JSON.stringify(this.objetos));
   }

   nuevoObjeto(objeto: Objeto){
    return{
      id:this.objetos.length + 1,
      email: '',
      ubicacion: '',
      fecha: '',
      tipo: '',
      descripcion: '',
    };
  }
}
