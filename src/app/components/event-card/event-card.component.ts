import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Evenement } from '../../../models/evenement';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() evenement!:Evenement
  @Output() participate = new EventEmitter<number>(); 

  showParticipationModal = false;

  openParticipationModal() {
    this.participate.emit(this.evenement.id);
  }
}
