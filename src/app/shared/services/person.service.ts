import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _urlPerson = environment.urlApi + '/api/personnes';

  public person$ = new BehaviorSubject<Person | null>(null);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private _http: HttpClient
  ) { }

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

    this._http.patch<Person>(url, person, this.httpOptions)
      .subscribe(value => {
        this.person$.next(value);
      });
  }

}
