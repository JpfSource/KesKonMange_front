import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, ErrorNotification, Observable, of, ReplaySubject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
/**
 * Service qui envoie les requêtes HTTP POST le signin et login au server
 */
export class AuthService {



  private _urlAuth = environment.urlApi + '/api/utilisateurs';

  public user$ = new BehaviorSubject<Person|null>(null);
public isLoggedIn$ = new ReplaySubject<boolean>(1);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _http : HttpClient,
    ) { }

    handleError(error: any){
      return throwError(error)
    }

  /**
   * Méthode POST de l'Utilisateur lors de son identification.
   * @param person
   * @returns
   */
  login(person: Person): Observable<any> {
    return this._http.post<Person>(this._urlAuth + '/login', person, this.httpOptions)
                      .pipe(
                        tap(person => {
                          this.user$.next(person);
                          this.isLoggedIn$.next(!!person);
                        }),
                        catchError(this.handleError)
                      );

  }


  /**
   * Méthode POST de l'Utilisateur lors de l'enregistrement.
   * @param person
   * @returns
   */
  signin(person: Person): Observable<any> {
    return this._http.post<Person>(this._urlAuth + '/signin', person, this.httpOptions);
  }

  // logout() {
//   return this.http
//     .delete(this._urlAuth + '/logout')
//     .pipe(
//       tap(() => {
//         this.user$.next(null);
//         this.isLoggedIn$.next(false);
//       })
//     );
// }

// public getConnectedUser() {
//   return this.http
//     .get<User>(`${this._urlAuthApi}/connected`)
//     .pipe(
//       tap(user => {
//         this.user$.next(user);
//         this.isLoggedIn$.next(!!user);
//       })
//     );
// }

}







