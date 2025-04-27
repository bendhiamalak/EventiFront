import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { Categorie, Evenement } from '../../../models/evenement';
import { Participant } from '../../../models/participant';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  eventList: Evenement[] = [];
  allEvents: Evenement[] = [];
  categories = Object.values(Categorie);
  errMsg!: string;
  isLoading: boolean = true;

  selectedEventId!: number;
  showParticipationModal = false;

  filters: {
    title: string;
    categorie: Categorie | '';
    place: string;
    date: string;
  } = {
    title: '',
    categorie: '',
    place: '',
    date: '',
  };
  constructor(private eventService: EvenementService) {}

  ngOnInit(): void {
    this.eventService.getEvenements().subscribe((events) => {
      this.allEvents = events;
      this.isLoading=false
      this.eventList = [...this.allEvents];
    });
  }

  applyFilters(): void {
    this.eventList = this.allEvents.filter((event) => {
      const matchTitle = this.filters.title
        ? event.title.toLowerCase().includes(this.filters.title.toLowerCase())
        : true;

      const matchCategorie = this.filters.categorie
        ? event.categorie.toLowerCase() === this.filters.categorie.toLowerCase()
        : true;

      const matchPlace = this.filters.place
        ? event.lieu.toLowerCase().includes(this.filters.place.toLowerCase())
        : true;

      const matchDate = this.filters.date
        ? new Date(event.date).toDateString() ===
          new Date(this.filters.date).toDateString()
        : true;

      return matchTitle && matchCategorie && matchPlace && matchDate;
    });
  }

  clearFilters(): void {
    this.filters = {
      title: '',
      categorie: '',
      place: '',
      date: '',
    };
    this.eventList = [...this.allEvents];
  }

  onParticipate(eventId: number) {
    const event = this.eventList.find((e) => e.id === eventId);
    if (event) {
      this.selectedEventId = eventId;
      this.showParticipationModal = true;
    }
  }

  handleParticipation(participant: Participant) {
    this.eventService
      .addParticipant(this.selectedEventId, participant)
      .subscribe({
        next: () => {
          this.showParticipationModal = false;
          console.log('participant added !');
        },
        error: (err) => {
          console.error('Error adding participant', err);
        },
      });
  }

  cancelParticipation() {
    this.showParticipationModal = false;
  }
}
