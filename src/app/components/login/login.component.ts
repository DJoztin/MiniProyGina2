import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  accounts: any[] = [];
  isLoggedIn = false;
  username: string = '';
  loginError: boolean = false;
  img: string = 'assets/img/log.webp';
  hide = signal(true);

  togglePasswordVisibility(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.getAccounts().subscribe((data: any) => {
      this.accounts = data;
    });
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.username = localStorage.getItem('username') || '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password, email } = this.loginForm.value;
      this.login(username, password, email);
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  login(username: string, password: string, email: string) {
    const account = this.accounts.find(
      (acc) =>
        acc.username === username &&
        acc.password === password &&
        acc.email === email
    );

    if (account) {
      this.authService.login(username);
      this.isLoggedIn = true;
      this.username = username;
      this.loginError = false;
      // Redireccion al panel de admin
      this.router.navigate(['/admin']);
    } else {
      this.loginError = true;
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.loginForm.reset();
  }
}
