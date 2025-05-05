import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  constructor(private http: HttpClient) {}

  getHotels() {
    return this.http.get('/assets/hotels.json').pipe(take(1));
  }
}
