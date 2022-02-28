import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
/**
 * Service qui envoie les requêtes HTTP POST le signin et login au server
 */
export class AuthService {

  private _urlAuth = environment.urlApi + '/api/auth';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _http : HttpClient) { }

  login(person :Person): Observable<any> {
    return this._http.post(this._urlAuth + '/login', person, this.httpOptions);
  }

  register(person :Person): Observable<any> {
    return this._http.post(this._urlAuth + '/signin', person, this.httpOptions);
  }

}
