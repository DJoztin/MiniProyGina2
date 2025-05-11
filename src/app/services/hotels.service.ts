import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, take } from 'rxjs';
import { Hotel } from '../models/hotels';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  private hotelsSubject: BehaviorSubject<Hotel[]> = new BehaviorSubject<
    Hotel[]
  >([]);
  private searchPatternSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  // Hotel obs es un observable que combina la lista completa de hoteles con el sistema de filtrado por nombre o ubicacion
  // Si no se provee ningun pattern de filtro, simplemente se devuelven todos los hoteles, pero si hay pattern hace el filtro y
  // Devuelve lo que se da
  _hotelsObs: Observable<Hotel[]> = combineLatest([
    this.hotelsSubject.asObservable(),
    this.searchPatternSubject.asObservable(),
  ]).pipe(
    map(([hotels, pattern]) => {
      if (!pattern) return hotels;
      return hotels.filter((hotel) => {
        return (
          hotel.nombre.toLowerCase().includes(pattern.toLowerCase()) ||
          hotel.ubicacion.toLowerCase().includes(pattern.toLowerCase())
        );
      });
    })
  );

  constructor(private http: HttpClient) {
    this.fetchHotels();
  }

  fetchHotels(): void {
    // Si ya hay hoteles en el array ya hace falta
    if (this.hotelsSubject.getValue().length !== 0) return;

    this.http
      .get<Hotel[]>('https://fluky-resorts-2.free.beeceptor.com/hotels')
      // .get<Hotel[]>('https://fluky.free.beeceptor.com/todos')
      .pipe(take(1))
      .subscribe((hotels) => {
        this.hotelsSubject.next(hotels);
      });
  }

  getBestHotels(): Hotel[] {
    const aux = [...this.hotelsSubject.getValue()];
    console.log('AUX', aux);
    const bestHotels = aux.sort((a, b) => b.rating - a.rating).slice(0, 3);
    return bestHotels;
  }

  getHotelsBusqueda(pattern: string): void {
    this.searchPatternSubject.next(pattern);
  }

  getHotel(position: number): Hotel {
    return this.hotelsSubject.getValue()[position];
  }

}
