export class Person {
  // Données de l'écran Identité
  nom!: string;
  prenom!: string;
  description?: string;
  dateNaissance!: Date;
  urlPhoto?: string;

  // Données de l'écran Morphologie
  genre!: string;
  taille!: number;
  poids!: number;
  objectifCalorique!: number;
  activite!: string;
  besoinsCaloriques!: number;
  id!: number ;
}
