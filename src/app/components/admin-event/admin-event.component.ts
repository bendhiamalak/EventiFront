import { Component, ViewChild } from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { Categorie, Evenement } from '../../../models/evenement';
import { Router } from '@angular/router';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrl: './admin-event.component.css',
})
export class AdminEventComponent {
  @ViewChild(EditEventComponent) editEventComponent!: EditEventComponent;
  searchTerm: string = '';
  events: Evenement[] = [];
  filteredEvents: Evenement[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  isLoading: boolean = true;
  showForm: boolean = false;
  isUpdate: boolean = false;
  selectedEvent!: Evenement;
  Categorie = Categorie;
  

  ngOnInit(): void {
    this.getAllEvents();
  }

  constructor(private eventService: EvenementService, private router: Router, private fileUploadService: FileUploadService ) {}

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
    this.isLoading = true;
    this.eventService.getEvenements().subscribe({
      next: (events) => {
        this.events = events;
        this.filteredEvents = [...events];
        this.calculateTotalPages();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading events', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Event loading completed');
      },
    });
  }

  filterEvents() {
    if (!this.searchTerm) {
      this.filteredEvents = [...this.events];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredEvents = this.events.filter(event => 
        event.title.toLowerCase().includes(searchTermLower) || 
        (event.description && event.description.toLowerCase().includes(searchTermLower))
      );
    }
    this.calculateTotalPages();
    this.currentPage = 1;
  }
  
  openAddEventModal(): void {
    this.selectedEvent = new Evenement();
    this.selectedEvent.title = '';
    this.selectedEvent.description = '';
    this.selectedEvent.date = new Date();
    this.selectedEvent.lieu = '';
    this.selectedEvent.capacite = 0;
    this.selectedEvent.categorie = Categorie.CONFERENCE;
    this.selectedEvent.prix = 0;
    this.selectedEvent.image = '';
    this.selectedEvent.participants = [];
    
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
    this.selectedEvent = new Evenement();
    this.selectedEvent.id = event.id;
    this.selectedEvent.title = event.title;
    this.selectedEvent.description = event.description;
    this.selectedEvent.date = event.date;
    this.selectedEvent.lieu = event.lieu;
    this.selectedEvent.capacite = event.capacite;
    this.selectedEvent.categorie = event.categorie;
    this.selectedEvent.prix = event.prix;
    this.selectedEvent.image = event.image;
    this.selectedEvent.participants = event.participants ? [...event.participants] : [];
    
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
          console.log('Event deleted successfully!');
          this.isLoading = false;
        },
        error: (err) => {
          this.events = [...this.events, event];
          this.filteredEvents = [...this.filteredEvents, event];
          this.calculateTotalPages();
          console.error('Error deleting event:', err);
          this.isLoading = false;
        },
      });
    }
  }

  handleSubmit(event: Evenement) {
    this.isLoading = true;
    
    const imageFile = this.editEventComponent?.currentFile;
    
    if (imageFile) {
      this.eventService.createEventWithImage(event, imageFile).subscribe({
        next: (savedEvent) => {
          this.finishEventSubmission();
        },
        error: (err) => {
          console.error('Error:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.eventService.addEvent(event).subscribe({
        next: (savedEvent) => {
          this.finishEventSubmission();
        },
        error: (err) => {
          console.error('Error:', err);
          this.isLoading = false;
        }
      });
    }
  }

  finishEventSubmission() {
    this.getAllEvents();
    this.showForm = false;
    this.isLoading = false;
    console.log('Event process completed successfully!');
  }

  cancelForm(): void {
    this.showForm = false;
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    if (this.totalPages === 0) this.totalPages = 1;
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