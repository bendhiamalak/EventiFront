import { Component } from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { Categorie, Evenement } from '../../../models/evenement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrl: './admin-event.component.css',
})
export class AdminEventComponent {
  searchTerm: string = '';
  events: Evenement[] = [];
  filteredEvents: Evenement[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  isLoading: boolean = true;
  showForm: boolean = false;
  isUpdate: boolean = false;
  selectedEvent: Evenement = new Evenement();
  Categorie = Categorie;

  ngOnInit(): void {
    this.getAllEvents();
  }

  constructor(private eventService: EvenementService, private router: Router) {}

  getCategoryLabel(category: Categorie): string {
    switch (category) {
      case Categorie.CONFERENCE:
        return 'Conference';
      case Categorie.SEMINAIRE:
        return 'Seminar';
      case Categorie.ATELIER:
        return 'Workshop';
      default:
        return category;
    }
  }

  getAllEvents() {
    this.eventService.getEvenements().subscribe({
      next: (events) => {
        this.events = events;
        this.filteredEvents = [...events];
        this.isLoading = false;
        this.calculateTotalPages();
      },
      error: (error) => {
        console.error('Error loading events', error);
      },
      complete: () => {
        console.log('Event loading completed');
      },
    });
  }

  filterEvents() {
    if (!this.searchTerm) {
      this.filteredEvents = [...this.events];
      return;
    }
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(event => 
      event.title.toLowerCase().includes(searchTermLower) || 
      (event.description && event.description.toLowerCase().includes(searchTermLower))
    );
  }
  
  openAddEventModal(): void {
    this.selectedEvent = {
      id: 0,
      title: '',
      description: '',
      date: new Date(),
      lieu: '',
      capacite: 0,
      categorie: Categorie.CONFERENCE,
      prix: 0,
      image: '',
      participants: [],
    };
    this.isUpdate = false;
    this.showForm = true;
  }

  viewEventDetails(event: Evenement): void {
    if (event.id) {
      this.router.navigate(['/admin/viewDetail', event.id]);
    } else {
      console.error('Event ID is missing');
    }
  }

  editEvent(event: Evenement): void {
    this.selectedEvent = {
      ...event,
      participants: [...(event.participants || [])],
    };
    this.isUpdate = true;
    this.showForm = true;
  }

  deleteEvent(event: Evenement): void {
    if (
      confirm(
        `Êtes-vous sûr de vouloir supprimer l'événement "${event.title}" ?`
      )
    ) {
      this.isLoading = true;
      this.events = this.events.filter((e) => e.id !== event.id);
      this.filteredEvents = this.filteredEvents.filter(
        (e) => e.id !== event.id
      );
      this.calculateTotalPages();
      this.eventService.deleteEvent(event.id!).subscribe({
        next: () => {
          console.log('event deleted successfully !');
          this.isLoading = false;
        },
        error: (err) => {
          this.events = [...this.events, event];
          this.filteredEvents = [...this.filteredEvents, event];
          this.calculateTotalPages();
          console.log('error to delete event !');
          console.error('Erreur suppression:', err);
          this.isLoading = false;
        },
      });
    }
  }

  handleSubmit(event: Evenement) {
    this.isLoading = true;
    const eventToSave = {
      ...event,
      participants: event.participants || [],
    };
    const operation = this.isUpdate
      ? this.eventService.updateEvent(eventToSave)
      : this.eventService.addEvent(eventToSave);

    operation.subscribe({
      next: (savedEvent) => {
        const completeEvent = {
          ...savedEvent,
          participants: savedEvent.participants || [],
        };
        this.getAllEvents();
        this.showForm = false;
        this.isLoading = false;
        console.log('event added / updated successfully !');
      },
      error: (err) => {
        console.error('Error saving event', err);
        this.isLoading = false;
        console.log('failed event added / updated !');
      },
    });
  }

  cancelForm(): void {
    this.showForm = false;
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  getPageRange(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number, event?: Event): void {
    if (event) event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
