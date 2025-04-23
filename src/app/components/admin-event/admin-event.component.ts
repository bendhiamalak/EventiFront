import { Component } from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { Categorie, Evenement} from '../../../models/evenement';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrl: './admin-event.component.css'
})
export class AdminEventComponent {
  searchTerm: string = '';
  events: Evenement[] = [];
  filteredEvents: Evenement[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  Categorie = Categorie;

  ngOnInit(): void {
    this.getAllEvents();
  }

  constructor(private eventService: EvenementService){}

  getCategoryLabel(category: Categorie): string {
    switch(category) {
      case Categorie.CONFERENCE: return 'Conference';
      case Categorie.SEMINAIRE: return 'Seminar';
      case Categorie.ATELIER: return 'Workshop';
      default: return category;
    }
  }

  getAllEvents() {
    this.eventService.getEvenements().subscribe({
      next: (events) => {
        this.events = events;
        this.filteredEvents = [...events]; 
        this.calculateTotalPages();
      },
      error: (error) => {
        console.error('Error loading events', error);
      },
      complete: () => {
        console.log('Event loading completed');
      }
    });
  }

  
  openAddEventModal(): void {
    // Implémenter l'ouverture du modal
    console.log('Ouvrir modal de création');
  }
  viewEventDetails(event: Evenement): void {
    // Navigation vers la page de détails
    console.log('Voir détails', event);
  }

  editEvent(event: Evenement): void {
    // Ouvrir modal d'édition
    console.log('Éditer', event);
  }

  deleteEvent(event: Evenement): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'événement "${event.title}" ?`)) {
      // Implémenter la suppression
      console.log('Supprimer', event);
    }
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
