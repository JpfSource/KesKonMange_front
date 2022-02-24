import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../models/person';
import { TokenStorageService } from './token-storage.service';

// const httpOptions = {
//   headers: new HttpHeaders( {'Content-Type': 'application/json'} )
//   };

@Injectable({
  providedIn: 'root'
})
export class PersonService implements OnDestroy {

  private _urlPerson = environment.urlApi + '/api/personnes';

  public person$ = new BehaviorSubject<Person>(new Person());

  // A FAIRE DANS TOUTES LES REQUETES VERS LE BACK
  textHeader = 'Bearer '+ this.tokenStorage.getToken()!;

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization':  this.textHeader})
  };


  constructor(
    private _http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }



  ngOnDestroy(): void {
    this.person$.unsubscribe();
  }

  public getPersonAll() {
    // console.log(this.tokenService.getToken.toString);
   return this._http.get<Person[]>(this._urlPerson+"/all", this.httpOptions)
  }

  /**
   * Méthode qui permet d'avoir les données d'une personne dont l'id est passé en paramètre.
   * @param personId
   */
  public getPersonById(personId: number) {
    const url = this._urlPerson + '/' + personId;

    this._http.get<Person>(url)
      .subscribe(person => {
        this.person$.next(person);
      });
  }

  /**
   * Métode qui permet de mettre à jour les données du profil d'une personne dont l'id est passé en paramètre.
   * @param person
   * @param personId
   */
  updateProfil(person: Person) {

    const url = this._urlPerson + '/identite/' + person.id;

    this._http.patch<Person>(url, person)
      .subscribe(value => {
        this.person$.next(value);
      });
  }

}
