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

  public person$ = new BehaviorSubject<Person|null>(null);

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
  public getPersonById(personId: number): Observable<Person> {
    const url = this._urlPerson + '/' + personId;

    return this._http.get<Person>(url);
    // .subscribe(data => this.person$.next(data));
    // console.log('Connect to db');
  }

  updateProfil(person:Person, personId:number) {
    const url = this._urlPerson + '/' + personId;
    console.log(url);
    console.log(person);

    this._http.put<Person>(url, person, this.httpOptions)
    .subscribe( value=>{
      console.log(value)});


    // .subscribe(data => this.person$.next(data));
    // console.log('Connect to db');
  }

}
