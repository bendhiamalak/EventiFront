import { Component } from '@angular/core';
import { Evenement } from '../../../models/evenement';
import { Participant, PaymentMethod } from '../../../models/participant';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../../services/evenement.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
  participants: Participant[] = [];
  filteredParticipants: Participant[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  searchTerm: string = '';
  readonly PaymentMethod = PaymentMethod;
  
  event!:Evenement
  isLoading: boolean = true;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private eventService: EvenementService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEvent(+id);
    }
  }

  loadEvent(id: number): void {
    this.isLoading = true;
    this.eventService.getEvenementById(id).subscribe({
      next: (event) => {
        this.event = event;
        this.participants = event.participants || [];
        this.filteredParticipants = [...this.participants];
        this.calculateTotalPages();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading event', err);
        this.isLoading = false;
      }
    });
  }
  
  

  getPaymentMethodLabel(method: PaymentMethod): string {
    switch(method) {
      case PaymentMethod.CREDIT_CARD: return 'Credit Card';
      case PaymentMethod.CASH: return 'Cash';
      default: return 'Unknown';
    }
  }

  viewParticipantDetails(participant: Participant): void {
    // Implémentez la navigation ou l'affichage des détails
    console.log('View participant details', participant);
  }

  editParticipant(participant: Participant): void {
    // Implémentez l'édition
    console.log('Edit participant', participant);
  }

  deleteParticipant(participant: Participant): void {
    if (confirm(`Are you sure you want to delete ${participant.name} ${participant.surname}?`)) {
      console.log("id participant",+participant.id)
      this.eventService.deleteParticipant(this.event.id, participant.id).subscribe({
        next: () => {
          const index = this.participants.findIndex(p => p.id === participant.id);
          if (index !== -1) {
            this.participants.splice(index, 1);
            this.filterParticipants();
            console.log('Participant deleted successfully');
          }
        },
        error: (err) => {
          console.error('Error deleting participant', err);
        
        }
      });
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredParticipants.length / this.itemsPerPage);
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

  filterParticipants(): void {
    if (!this.searchTerm) {
      this.filteredParticipants = [...this.participants];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredParticipants = this.participants.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.surname.toLowerCase().includes(term) ||
        p.email.toLowerCase().includes(term) ||
        p.phone.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.calculateTotalPages();
  }
}

goBack(){
  this.router.navigate(['/admin/events'])
}
}
