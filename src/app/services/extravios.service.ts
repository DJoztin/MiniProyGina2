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
    this.saveToLocalStorage()
  }

  editObjeto(obj: Objeto): void {
    console.log("En Editar Objeto: ", obj);
    const index = this.objetos.findIndex(aux => aux.id === obj.id);
    this.objetos[index] = obj;
    console.log(this.objetos);
    this.saveToLocalStorage();
  }

  deleteObjeto(idObjeto: number): boolean {
    const index = this.objetos.findIndex(rsv => rsv.id === idObjeto);
    if (index != -1) {
      this.objetos.splice(index, 1);
      this.saveToLocalStorage();
      return true;
    } else {
      // Si no existe la reserva develve false de que hubo error
      return false;
    }
  }

  nuevoObjeto(): Objeto {
    return {
      id: this.objetos.length + 1,
      email: '',
      ubicacion: '',
      fecha: '',
      tipo: '',
      descripcion: '',
    };
  }

  saveToLocalStorage(): void {
    console.log("Objeto a guardar: ", JSON.stringify(this.objetos));
    localStorage.setItem('objetosPerdidos', JSON.stringify(this.objetos));
  }
}
