import { Inject, Injectable } from '@angular/core';
import { Evenement } from '../../models/evenement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  evenements: Evenement[] = [];

  constructor(private http: HttpClient,  
    @Inject('BaseURL')private baseUrl:string,) { }

  getEvenements():Observable <Evenement[]> {
    return this.http.get<Evenement[]>(this.baseUrl+"evenements")
  }

  /*searchByTitle(title: string): Observable<Event[]> {
    const filtered = this.evenements.filter(event =>
      event.title.toLowerCase().includes(title.toLowerCase())
    );
    return of(filtered);
  }

  searchByDate(date: Date): Observable<Event[]> {
    const filtered = this.evenements.filter(event =>
      new Date(event.date).toDateString() === new Date(date).toDateString()
    );
    return of(filtered);
  }

  searchByPlace(place: string): Observable<Event[]> {
    const filtered = this.evenements.filter(event =>
      event.lieu.toLowerCase().includes(place.toLowerCase())
    );
    return of(filtered);
  }

  searchByCategory(categorie: Categorie): Observable<Event[]> {
    const filtered = this.evenements.filter(event =>
      event.categorie === categorie
    );
    return of(filtered);
  }*/
}
