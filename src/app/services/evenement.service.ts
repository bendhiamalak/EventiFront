import { Inject, Injectable } from '@angular/core';
import { Evenement } from '../../models/evenement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Participant } from '../../models/participant';
import { FileUploadService } from './file-upload.service';

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
    private fileUploadService: FileUploadService,
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

  /*addEvent(event: Evenement, imageFile?: File): Observable<Evenement> {
    // Assurer que la liste des participants est initialisée
    const eventToCreate = {
      ...event,
      participants: event.participants || []
    };
    
    // Première étape: créer l'événement
    return this.http.post<Evenement>(
      `${this.baseUrl}evenements`,
      eventToCreate,
      this.httpOptions
    ).pipe(
      switchMap(createdEvent => {
        // Si un fichier image est fourni, l'uploader
        if (imageFile) {
          return this.fileUploadService.upload(imageFile, createdEvent.id).pipe(
            // Après l'upload, renvoyer l'événement créé
            map(() => createdEvent)
          );
        }
        // Si pas d'image, simplement renvoyer l'événement créé
        return of(createdEvent);
      }),
      catchError(error => {
        console.error('Error creating event:', error);
        return throwError(() => error);
      })
    );
  }*/

    addEvent(event: Evenement): Observable<Evenement> {
      // Ne pas inclure l'ID dans la requête
      const { id, ...eventWithoutId } = event;
      return this.http.post<Evenement>(`${this.baseUrl}evenements`, eventWithoutId);
    }

    createEventWithImage(event: Evenement, imageFile: File): Observable<Evenement> {
      return this.http.post<Evenement>(`${this.baseUrl}evenements`, event).pipe(
        switchMap(createdEvent => {
          if (imageFile) {
            return this.fileUploadService.upload(imageFile, createdEvent.id!).pipe(
              map(() => createdEvent)
            );
          }
          return of(createdEvent);
        })
      );
    }
  
  updateEvent(event: Evenement): Observable<Evenement> {
    if (!event.id) {
      throw new Error('Cannot update event without ID');
    }
    // Préserver la liste des participants existante
    return this.getEvenementById(event.id).pipe(
      switchMap(existingEvent => {
        const eventToUpdate = {
          ...event,
          participants: event.participants || existingEvent.participants || []
        };
        return this.http.put<Evenement>(
          `${this.baseUrl}evenements/${event.id}`,
          eventToUpdate,
          this.httpOptions
        );
      })
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}evenements/${id}`);
  }

  addParticipant(eventId: number, participant: Participant): Observable<Participant> {
    return this.http.get<Evenement>(`${this.baseUrl}evenements/${eventId}`).pipe(
      switchMap((event) => {
        // Vérification capacité
        const currentParticipants = event.participants?.length || 0;
        if (currentParticipants >= event.capacite) {
          return throwError(() => new Error('Event capacity is full'));
        }
        
        // Vérifier si le participant existe déjà
        const participantExists = event.participants?.some(p => 
          p.email === participant.email
        );
        
        if (participantExists) {
          return throwError(() => new Error('Participant already registered'));
        }
        
        // Appel au bon endpoint pour ajouter un participant
        return this.http.post<Participant>(
          `${this.baseUrl}evenements/${eventId}/participants`,
          participant,
          this.httpOptions
        );
      }),
      catchError((error) => {
        console.error('Error adding participant:', error);
        return throwError(() => error);
      })
    );
  }

  deleteParticipant(eventId: number, participantId: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.baseUrl}evenements/${eventId}`).pipe(
      switchMap((event) => {
        const updatedParticipants = event.participants?.filter(p => p.id !== participantId) || [];
        const updatedEvent = {
          ...event,
          participants: updatedParticipants
        };
        return this.http.put<Evenement>(
          `${this.baseUrl}evenements/${eventId}`,
          updatedEvent,
          this.httpOptions
        );
      })
    );
  }
}
