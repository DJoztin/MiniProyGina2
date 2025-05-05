import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() username: string = 'Usuario';
  @Input() isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {}

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
  }
}
