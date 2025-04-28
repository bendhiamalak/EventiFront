import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Evenement } from '../../../models/evenement';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() evenement!:Evenement
  @Output() participate = new EventEmitter<number>(); 

  showParticipationModal = false;
  constructor(private fileUploadService:FileUploadService){}
  imageUrl(event: Evenement): string {
    if (event.image) {
      console.log(event.image)
      return this.fileUploadService.getImageUrl(event.image);
    }
    return 'assets/default-image.png'; 
  }
  openParticipationModal() {
    this.participate.emit(this.evenement.id);
  }
}
