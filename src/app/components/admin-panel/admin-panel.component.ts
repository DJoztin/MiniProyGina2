import { Component, input, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilAlt, faPlusCircle, faTrashAlt, faTurnUp } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  isLoggedIn: boolean = false;
  username: string = "";

  readonly reservType: string = "reserv";
  readonly lostItemType: string = "item"

  // Cosas de prueba:
  lostItems = [
    {
      nombreCliente: 'Juan Perez',
      objeto: 'Llaves',
      fechaPerdido: '2023-09-30',
    },
    {
      nombreCliente: 'Margarita la diosa de la cumbia',
      objeto: 'Cartera',
      fechaPerdido: '2023-10-01',
    },
    {
      nombreCliente: 'Carlos Santana',
      objeto: 'Guitarra',
      fechaPerdido: '2023-10-02',
    },
    {
      nombreCliente: 'Frida Kahlo',
      objeto: 'Pintura',
      fechaPerdido: '2023-10-03',
    },
  ];

  reservations = [
    {
      hotel: 'Hotel Samara',
      nombre: 'Juan Perez',
      fechaIngreso: '2023-10-01',
      fechaEgreso: '2023-10-05',
    },
    {
      hotel: 'Hotel Riviera',
      nombre: 'Ana Gómez',
      fechaIngreso: '2023-10-10',
      fechaEgreso: '2023-10-15',
    },
    {
      hotel: 'Hotel Paraíso',
      nombre: 'Carlos López',
      fechaIngreso: '2023-11-01',
      fechaEgreso: '2023-11-07',
    },
    {
      hotel: 'Hotel Sol y Mar',
      nombre: 'María Fernández',
      fechaIngreso: '2023-12-20',
      fechaEgreso: '2023-12-25',
    },
  ];
  constructor(private authService: AuthService, private router: Router, private loginService: LoginService) { }

  editIcon = faPencilAlt;
  deleteIcon = faTrashAlt;
  addIcon = faPlusCircle;

  ngOnInit() {
    // Si no esta logueado, no puede estar aqui, se redirecciona al Loguin
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.authService.username$.subscribe((name) => {
      this.username = name;
    });
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  addNew(type: string): void {
    console.log(type);
    if (type === this.reservType) 
      this.handleNewRsv();
    else
      this.handleNewLost();

  }

  handleNewRsv(){
    const title = "reservacion"
    // Swal con formulario para llenar la informacion y generar un nuevo registro
    Swal.fire({
      title: `Agregar Nueva ${title}`,
      html: `
      <form id="addForm">
        <label for="hotel" class="block text-left mb-2 ">Hotel:</label>
        <input id="hotel" type="text" class="swal2-input " placeholder="Ingrese el hotel">
        
        <label for="nombre" class="block text-left mb-2">Nombre:</label>
        <input id="nombre" type="text" class="swal2-input" placeholder="Ingrese el nombre del huesped">
        
        <label for="checkin" class="block text-left mb-2">Fecha de ingreso:</label>
        <input id="checkin" type="date" class="swal2-input">

        <label for="checkout" class="block text-left mb-2">Fecha de egreso:</label>
        <input id="checkout" type="date" class="swal2-input">
      </form>
    `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const input1 = (document.getElementById('hotel') as HTMLInputElement).value;
        const input2 = (document.getElementById('nombre') as HTMLInputElement).value;
        const inputDate1= (document.getElementById('checkin') as HTMLInputElement).value;
        const inputDate2 = (document.getElementById('checkout') as HTMLInputElement).value;

        if (!input1 || !input2 || !inputDate1 || !input2) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return null;
        }

        return { input1, input2, inputDate1, inputDate2 };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Datos ingresados:', result.value);
        // Aquí puedes manejar los datos ingresados, por ejemplo, guardarlos en un array o enviarlos a un servicio
      }
    });
  }
  
  handleNewLost(){
    const title = "cosa perdida"
    // Swal con formulario para llenar la informacion y generar un nuevo registro
    Swal.fire({
      title: `Agregar Nueva ${title}`,
      html: `
      <form id="addForm">
        <label for="nombre" class="block text-left mb-2 ">Nombre:</label>
        <input id="nombre" type="text" class="swal2-input " placeholder="Ingrese el nombre del huesped">
        
        <label for="object" class="block text-left mb-2">Objeto:</label>
        <input id="object" type="text" class="swal2-input" placeholder="Ingrese el nombre del objeto perdido">
        
        <label for="inputDate" class="block text-left mb-2">Fecha de la perdida:</label>
        <input id="inputDate" type="date" class="swal2-input">
      </form>
    `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const input1 = (document.getElementById('input1') as HTMLInputElement).value;
        const input2 = (document.getElementById('input2') as HTMLInputElement).value;
        const inputDate = (document.getElementById('inputDate') as HTMLInputElement).value;

        if (!input1 || !input2 || !inputDate) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return null;
        }

        return { input1, input2, inputDate };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Datos ingresados:', result.value);
        // Aquí puedes manejar los datos ingresados, por ejemplo, guardarlos en un array o enviarlos a un servicio
      }
    });
  }

  edit(type: string, id: number) {
    // Swal con formulario con los datos actuales del item a modificar
  }

  delete(type: string, id: number) {
    // Swal para confirmar el borrado, despues proceder

  }
}
