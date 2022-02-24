import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  respService!: boolean;
  constructor(
    private _authService : AuthService,
    private _router: Router,
    ){}

  canActivate() {
    if (this._authService.checkIfUserIsConnected()) {
      return true;
    }
    this._router.navigateByUrl('/login');
    return false;
  }

}
