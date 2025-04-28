import { Participant } from './participant';

export enum Categorie {
  CONFERENCE = 'CONFERENCE',
  SEMINAIRE = 'SEMINAIRE',
  ATELIER = 'ATELIER'
}

export class Evenement {
  id?: number;
  title: string;
  description: string;
  date: Date;
  lieu: string;
  capacite: number;
  categorie: Categorie;
  prix: number;
  image?: string;
  participants: Participant[];

  constructor(init?: Partial<Evenement>) {
    this.id = init?.id;
    this.title = init?.title || '';
    this.description = init?.description || '';
    this.date = init?.date || new Date();
    this.lieu = init?.lieu || '';
    this.capacite = init?.capacite || 0;
    this.categorie = init?.categorie || Categorie.CONFERENCE;
    this.prix = init?.prix || 0;
    this.image = init?.image;
    this.participants = init?.participants || [];
  }
} 