import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faL, faPencilAlt, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from '../../models/reservation';
import { BookingService } from '../../services/booking.service';
import Swal from 'sweetalert2';
import { AdminFormModalComponent } from '../admin-form-modal/admin-form-modal.component';



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
  }

  editIcon = faPencilAlt;
  deleteIcon = faTrashAlt;
  addIcon = faPlusCircle;

  ngOnInit() {
    // Tomar los datos de los servicios

    this.fetchData();
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

  // Funcion para agarrar los datos de los dos servicios, rsv y cosas perdidas, si estos devolvieran observables esta funcion
  // se podria ahorrar pero como no lo hacen es mejor asi
  fetchData(): void {
    this.reservations = this.reservService.getReservas();
  }

  openNewModal(type: string): void {
    console.log(type);

    // Se abre el formulario con data null porque es para agregar un nuevo registro
    this.openForm(type, null, false);
  }

  openEditModal(type: string, id: number) {
    console.log(type, id);

    // Se tiene que conseguir el objeto que se quiere editar del arreglo correspondiente y mandarlo a open form como data
    const data = (type === this.reservType) ? this.reservations[id - 1] : this.lostItemType[id - 1];
    console.log(data);
    this.openForm(type, data);
  }


  openForm(type: string, data: any = null, isEditing: boolean = true) {
    const dialogRef = this.dialog.open(AdminFormModalComponent, {
      data: { type, data },
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos: ', result);
        if(type == this.reservType){
          if(!isEditing){
            // Creacion de nueva reservacion
            this.reservService.agregarReserva(result);
          }else{
            // Edicion de una reservacion
            this.reservService.editReserva(result);
          }
        } else{
          if(!isEditing){
            // Creacion de un nuevo objeto perdido
          }else{
            // Edicion de un objeto perdido
          }
        }

        this.fetchData();
      }
    })
  }


  async showModalDelete(type: string, id: number) {
    // Swal para confirmar el borrado, despues proceder
    const response = await Swal.fire({
      title: "Seguro que quieres eliminar este registro?",
      text: "Esta accion no se puede deshacer",
      showCancelButton: true,
      showConfirmButton: true
    });

    if (response.isConfirmed) {
      this.delete(type, id);
    }

  }

  delete(type: string, id: number) {
    // IMPORTANT TODO!!!: Cambiar el else del operador ternario por el metodo de borrar cosa perdida
    // Llamar a servicio correspondiente y borrar registro, devuelve true si sale bien, si no sale bien devuelve false
    let result: boolean = (type === this.reservType) ? this.reservService.deleteReserva(id) : this.reservService.deleteReserva(id);
    // Swal de confirmacion o error
    if (result) {
      Swal.fire({
        icon: "success",
        text: "El registro fue borrado con Exito",
      });
      // Actalizar el array de datos ya que se modificaron
      this.fetchData();
    } else {
      Swal.fire({
        icon: "error",
        text: "Ocurrio un error durante el eliminado del registro",
      })
    }
  }

  createNew(type: string, data: any){

  }

  edit(type: string, data:any){

  }

}
