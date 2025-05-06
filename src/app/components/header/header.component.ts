import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() username: string = 'Usuario';
  @Input() isLoggedIn: boolean = false;

  currentRoute: string = '';
  private routerSubscription: Subscription = new Subscription();

  constructor(public router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRoute();
      }
    });

    this.updateCurrentRoute();
  }

  ngOnChanges() {
    this.updateCurrentRoute();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateCurrentRoute(): void {
    this.currentRoute = this.router.url.split('/')[1] || '';
  }
}
