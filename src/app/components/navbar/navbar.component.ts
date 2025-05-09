import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() isroot: boolean = false;
  @Input() username: string = 'Usuario';
  @Input() isLoggedIn: boolean = false;
  mobileMenuVisible: boolean = false;
  faBars = faBars;

  constructor(private loginService: LoginService) {}

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
  }
}
