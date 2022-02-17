import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _urlPerson = environment.urlApi + '/api/personnes';

  public person$ = new BehaviorSubject<Person|null>(null);

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
    .subscribe(data => this.person$.next(data));
    console.log('Connect to db');
  }
}
