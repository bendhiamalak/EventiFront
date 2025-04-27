import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categorie, Evenement } from '../../../models/evenement';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {
  @Input() isUpdate: boolean = false;
  @Input() event: Evenement = new Evenement();
  @Output() submitEvent = new EventEmitter<Evenement>();
  @Output() cancel = new EventEmitter<void>();

  categories = Object.values(Categorie);
  isLoading: boolean = false;
  eventDate: string = '';

  
  constructor() { }

  ngOnInit(): void {
    if (this.event.date) {
      const date = new Date(this.event.date);
      this.eventDate = date.toISOString().slice(0, 16);
    }
    if (!this.event.participants) {
      this.event.participants = [];
  }
  }

  getCategoryLabel(category: Categorie): string {
    switch(category) {
      case Categorie.CONFERENCE: return 'Conference';
      case Categorie.SEMINAIRE: return 'Seminar';
      case Categorie.ATELIER: return 'Workshop';
      default: return category;
    }
  }

  onSubmit() {
    if (this.eventDate) {
      
      this.event.date = new Date(this.eventDate);
    }
    
    this.isLoading = true;
    this.submitEvent.emit(this.event);
  }

  onCancel() {
    this.cancel.emit();
  }
}
