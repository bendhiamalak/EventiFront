import { Participant } from "./participant";

export class Evenement {
    id!:number;
    title!:string;
    description!:string;
    date!:Date;
    lieu!:string;
    capacite!:number;
    categorie!:Categorie
    prix!:number;
    image!:string;
    participants:Participant[]=[];

    constructor() {
      this.participants = [];
  }
}

export enum Categorie {
CONFERENCE = 'CONFERENCE',
  SEMINAIRE = 'SEMINAIRE',
  ATELIER = 'ATELIER'
}
