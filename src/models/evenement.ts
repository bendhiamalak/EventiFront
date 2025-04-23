export class Evenement {
    title!:string;
    description!:string;
    date!:Date;
    lieu!:string;
    capacite!:number;
    categorie!:Categorie
    prix!:number;
    image!:string;
    

}

export enum Categorie {
CONFERENCE = 'conférences',
  SEMINAIRE = 'séminaires',
  ATELIER = 'ateliers'
}
