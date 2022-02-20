export class Person {

  constructor(
    public nom: string,
    public prenom: string,
    public dateNaissance: Date,
    public urlPhoto: string,
    public genre: string,
    public taille: number,
    public poids: number,
    public objectifCalorique: number,
    public activite: string,
    public besoinsCaloriques: number,
    public id: number,
    public description?: string,
  ){ }

  // Données de l'écran Identité
  // nom!: string;
  // prenom!: string;
  // description?: string;
  // dateNaissance!: Date;
  // urlPhoto?: string;

  // // Données de l'écran Morphologie
  // genre!: string;
  // taille!: number;
  // poids!: number;
  // objectifCalorique!: number;
  // activite!: string;
  // besoinsCaloriques!: number;
  // id!: number ;

}
