import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private loggedInSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  private usernameSubject = new BehaviorSubject<string>(
    localStorage.getItem('username') || 'Usuario'
  );

  loggedIn$ = this.loggedInSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  getAccounts() {
    return this.http.get('assets/accounts.json').pipe(take(1));
  }

  login(username: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    this.loggedInSubject.next(true);
    this.usernameSubject.next(username);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.loggedInSubject.next(false);
    this.usernameSubject.next('Usuario');
  }
}
