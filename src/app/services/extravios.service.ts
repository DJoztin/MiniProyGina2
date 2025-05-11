import { Injectable } from '@angular/core';
import { Objeto } from '../models/objetos';

@Injectable({
  providedIn: 'root'
})
export class ExtraviosService {

  objetos: Objeto[]=[];


  constructor() {
    const data = localStorage.getItem('objetosPerdidos');
    this.objetos = data ? JSON.parse(data) : [];
  }

   obtenerObjetos(): Objeto[] {
    const data = localStorage.getItem('objetosPerdidos');
    return data ? JSON.parse(data) : [];
  }
    agregarObjeto(obj: Objeto): void {
    this.objetos.push(obj);
    localStorage.setItem('objetosPerdidos', JSON.stringify(this.objetos));
  }


   nuevoObjeto(): Objeto{
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
