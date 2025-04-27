import { Inject, Injectable } from '@angular/core';
import { Evenement } from '../../models/evenement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Participant } from '../../models/participant';

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  evenements: Evenement[] = [];

  constructor(
    private http: HttpClient,
    @Inject('BaseURL') private baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.baseUrl + 'evenements');
  }

  getEvenementById(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.baseUrl}evenements/${id}`);
  }

  addEvent(event: Evenement): Observable<Evenement> {
    if (!event.participants) {
      event.participants = [];
    }
    return this.http.post<Evenement>(
      `${this.baseUrl}evenements`,
      event,
      this.httpOptions
    );
  }

  updateEvent(event: Evenement): Observable<Evenement> {
    if (!event.id) {
      throw new Error('Cannot update event without ID');
    }
    const eventToUpdate = {
      ...event,
      participants: event.participants || [],
    };
    return this.http.put<Evenement>(
      `${this.baseUrl}evenements/${event.id}`,
      eventToUpdate,
      this.httpOptions
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}evenements/${id}`);
  }

  addParticipant(
    eventId: number,
    participant: Participant
  ): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.baseUrl}evenements/${eventId}`).pipe(
      switchMap((event) => {
        // Vérification capacité
        const currentParticipants = event.participants?.length || 0;
        if (currentParticipants >= event.capacite) {
          return throwError(() => new Error('Event capacity is full'));
        }

        // Génération ID robuste
        const existingIds = (event.participants || [])
          .map(p => p.id)
          .filter(id => typeof id === 'number') as number[];
        
        const newId = existingIds.length > 0 
          ? Math.max(...existingIds) + 1 
          : 1;

        // Création nouveau participant
        const newParticipant: Participant = {
          ...participant,
          id: newId
        };

        // Mise à jour événement
        const updatedEvent = {
          ...event,
          capacite: event.capacite - 1,
          participants: [...(event.participants || []), newParticipant]
        };

        return this.http.put<Evenement>(
          `${this.baseUrl}evenements/${eventId}`,
          updatedEvent,
          this.httpOptions
        );
      }),
      catchError((error) => {
        console.error('Error adding participant:', error);
        return throwError(() => error);
      })
    );
  }

  deleteParticipant(eventId: number, participantId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}evenements/${eventId}/participants/${participantId}`
    );
  }
}
