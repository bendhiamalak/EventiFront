
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Event {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  date: string;
  price: number;
  location:string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Event[] = [
    {
      id: 1,
      name: 'Summer Music Festival',
      imageUrl: 'assets/image.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.',
      date: '2025-06-15',
      price: 50,
      location: 'Central Park, New York',
    },
    // Add more events as needed
  ];

  getEventById(id: number): Observable<Event> {
    const event = this.events.find(e => e.id === id);
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    return of(event);
  }
}