
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-participate-modal',
  templateUrl: './participate-modal.component.html',
  styleUrls: ['./participate-modal.component.scss']
})
export class ParticipateModalComponent {
  @Input() eventName: string | undefined;
  participateForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.participateForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      paymentMethod: ['espece', Validators.required],
      cardNumber: [''],
      cardOwner: [''],
      cardCode: ['']
    });
  }

  ngOnInit(): void {
    this.participateForm.get('paymentMethod')?.valueChanges.subscribe((method) => {
      const cardNumber = this.participateForm.get('cardNumber');
      const cardOwner = this.participateForm.get('cardOwner');
      const cardCode = this.participateForm.get('cardCode');

      if (method === 'carte') {
        cardNumber?.setValidators([Validators.required]);
        cardOwner?.setValidators([Validators.required]);
        cardCode?.setValidators([Validators.required]);
      } else {
        cardNumber?.clearValidators();
        cardOwner?.clearValidators();
        cardCode?.clearValidators();
      }

      cardNumber?.updateValueAndValidity();
      cardOwner?.updateValueAndValidity();
      cardCode?.updateValueAndValidity();
    });
  }


  onSubmit(): void {
    if (this.participateForm.valid) {
      const formValue = this.participateForm.value;
      const isCardPayment = formValue.paymentMethod === 'carte';
  
      const result = {
        ...formValue,
        payed: isCardPayment ? true : false
      };
  
      console.log('Form Submitted:', result);
      this.activeModal.close(result);
    }
  }
  
}