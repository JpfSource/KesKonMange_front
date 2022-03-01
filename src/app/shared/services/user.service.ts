import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private tokenStorage: TokenStorageService) { }
token = this.tokenStorage.getToken()
helper = new JwtHelperService();

decodedToken = this.helper.decodeToken(this.token!);
expirationDate = this.helper.getTokenExpirationDate(this.token!);
isExpired = this.helper.isTokenExpired(this.token!);

}

