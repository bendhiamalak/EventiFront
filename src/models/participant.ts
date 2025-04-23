export class Participant {
    name!: string;
    surname!:string;
    email!:string;
    phone!:string;
    paymentMethod!:PaymentMethod

    constructor(name: string, surname: string, email: string, phone: string, paymentMethod: PaymentMethod) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.paymentMethod = paymentMethod;}
        
}

export enum PaymentMethod{
    CREDIT_CARD,
    CASH
}