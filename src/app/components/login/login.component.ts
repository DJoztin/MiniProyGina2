import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
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
import { MatError } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  accounts: any[] = [];
  isLoggedIn = false;
  loginError: boolean = false;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginService.getAccounts().subscribe((data: any) => {
      this.accounts = data;
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.login(username, password);
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  login(username: string, password: string) {
    const account = this.accounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (account) {
      this.authService.login(username);
      this.isLoggedIn = true;
      this.loginError = false;
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
