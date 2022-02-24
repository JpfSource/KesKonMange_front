import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, ErrorNotification, Observable, of, ReplaySubject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';
import { TokenStorageService } from './token-storage.service';

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

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private _http : HttpClient,
    private tokenStorage: TokenStorageService
    ) {
      setTimeout(() => {
        this.checkIfUserIsConnected();
      }, 10000);
     }

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

  textHeader = 'Bearer '+ this.tokenStorage.getToken()!;
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization':  this.textHeader})
  };

  checkIfUserIsConnected(){
    //créer une route coté serveur, il reçoit un token et vérifie s'il existe
    return this._http.get(this._urlAuth + "/connected", this.httpOptions).subscribe( resp => { this.isLoggedIn$.next(!!resp)
      console.log(!!resp)
    })
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







