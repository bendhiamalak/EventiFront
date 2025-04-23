import { Component } from '@angular/core';
import { Participant } from '../../../models/participant';

@Component({
  selector: 'app-participate-event',
  templateUrl: './participate-event.component.html',
  styleUrl: './participate-event.component.css'
})
export class ParticipateEventComponent {
  participant!:Participant

  onSubmit(){}
  onCancel(){}
}
