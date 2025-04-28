export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export class Participant {
  id?: number;
  name: string = '';
  surname: string = '';
  email: string = '';
  phone: string = '';
  paymentMethod: PaymentMethod = PaymentMethod.CASH;

  constructor(init?: Partial<Participant>) {
    Object.assign(this, init);
  }
} 