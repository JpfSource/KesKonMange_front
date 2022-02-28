import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService implements OnDestroy {

  private _urlPerson = environment.urlApi + '/api/personnes';

  public person$ = new BehaviorSubject<Person>(new Person());

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private _http: HttpClient
  ) { }

  ngOnDestroy(): void {
    this.person$.unsubscribe();
  }

  /**
   * Méthode qui permet d'avoir les données d'une personne dont l'id est passé en paramètre.
   * @param personId
   */
  public getPersonById(personId: number) {
    const url = this._urlPerson + '/' + personId;

    return this._http.get<Person>(url)
      .pipe(
        tap(person => {
          this.person$.next(person);
        })
      )
  }

  /**
   * Méthode qui permet de mettre à jour les données du profil d'une personne dont l'id est passé en paramètre.
   * @param person
   * @param personId
   */
  update(person: Person) {
    return this._http.put<Person>(this._urlPerson + '/' + person.id, person, this.httpOptions)
      .pipe(
        tap(person => {
          this.person$.next(person);
        }
        )
      )

  }

  changeData(person: Person) {
    return this._http
      .put<number>(this._urlPerson + '/recalcul', person, this.httpOptions)
      .pipe(
        tap(newBC => {
          person.besoinsCaloriques = newBC;
          this.person$.next(person);
        })
      );
  }


}
