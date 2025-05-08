import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Hotel } from '../models/hotels';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  private hotelsSubject: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);
  _hotelsObs: Observable<Hotel[]> = this.hotelsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchHotels();
  }

  fetchHotels(): void {
    // Si ya hay hoteles en el array ya hace falta
    if (this.hotelsSubject.getValue().length !== 0) return;

    this.http.get<Hotel[]>('https://fluky-resorts.free.beeceptor.com/hotels').pipe(take(1)).subscribe(
      ((hotels) => {
        this.hotelsSubject.next(hotels);
      })
    );
  }

  getBestHotels(): Hotel[] {
    const aux = [...this.hotelsSubject.getValue()];
    console.log("AUX", aux)
    const bestHotels = aux
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    return bestHotels;
  }
}
