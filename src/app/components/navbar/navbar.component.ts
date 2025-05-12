import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription, filter } from 'rxjs';
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
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() isroot: boolean = false;
  @Input() username: string = 'Usuario';
  @Input() isLoggedIn: boolean = false;
  mobileMenuVisible: boolean = false;
  faBars = faBars;

  private routeSub!: Subscription;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.routeSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.mobileMenuVisible = false;
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
  }

  redirectAdmin(){
    this.router.navigate(['/admin']);
  }
}
