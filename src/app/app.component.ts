import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hoteles';
  isLoggedIn = false;
  username = 'Usuario';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.authService.username$.subscribe((name) => {
      this.username = name;
    });
  }
}
