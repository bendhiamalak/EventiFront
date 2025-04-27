import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Participant, PaymentMethod } from '../../../models/participant';

@Component({
  selector: 'app-participate-event',
  templateUrl: './participate-event.component.html',
  styleUrl: './participate-event.component.css'
})
export class ParticipateEventComponent {
  @Input() eventId!: number;
  
  @Output() submitParticipation = new EventEmitter<Participant>();
  @Output() cancel = new EventEmitter<void>();
  participant: Participant = new Participant('', '', '', '', PaymentMethod.CREDIT_CARD);
  paymentMethods: PaymentMethod[] = Object.values(PaymentMethod)
  .filter(value => typeof value === 'number') as PaymentMethod[];
  isLoading: boolean = false;

  getPaymentMethodLabel(method: PaymentMethod): string {
    switch(method) {
      case PaymentMethod.CREDIT_CARD: return 'Credit Card';
      case PaymentMethod.CASH: return 'Cash';
      default: 
        const exhaustiveCheck: never = method;
        return 'Unknown';
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.submitParticipation.emit(this.participant);
  }

  onCancel() {
    this.cancel.emit();
  }
}
