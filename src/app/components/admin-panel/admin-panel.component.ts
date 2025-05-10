import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilAlt, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from '../../models/reservation';
import { BookingService } from '../../services/booking.service';



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

  reservations: Reservation[] = [];

  constructor(private authService: AuthService, private router: Router, 
    private loginService: LoginService, private dialog: MatDialog, private reservService: BookingService) {
      this.reservations = reservService.getReservas();
    }

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
    
    // Se abre el formulario con data null porque es para agregar un nuevo registro
    this.openForm(type, null);
  }


  openForm(type:string, data: any){

  }

  edit(type: string, id: number) {
    console.log(type, id);

    // Se tiene que conseguir el objeto que se quiere editar del arreglo correspondiente y mandarlo a open form como data
    const data = (type === this.reservType) ? this.reservations[id] : this.lostItemType[id];
    console.log(data);
    this.openForm(type, data);
  }

  delete(type: string, id: number) {
    // Swal para confirmar el borrado, despues proceder

  }
}
