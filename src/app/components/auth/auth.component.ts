import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/shared/models/person';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  signinForm!: FormGroup;
  person?: Person | null;

  isSignupFormView = false;

  //variable gestion token du formulaire login
  isLoggedIn = false;
  isLoginFailed = false
  isSuccess = false;

  errorMessage = '';
  error!: string;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this._tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    this.signinForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(4)]],
    });

    if (this._route.snapshot.routeConfig?.path == 'signin') {
      this.signinForm.addControl('prenom', this._fb.control('', [Validators.required, Validators.minLength(2)]));
      this.signinForm.addControl('nom', this._fb.control('', [Validators.required, Validators.minLength(2)]));
      this.isSignupFormView = true;
    }
  }

  submitForm(): void {
    if (this.signinForm.valid) {
      const p = { ...this.person, ...this.signinForm.value }
      if (this.isSignupFormView) {
        this._authService.signin(p).subscribe({
          next: (() => {
            this.isSuccess = true;
            this._router.navigateByUrl('/login');
          }),
          error: err => this.error = err?.error || 'Il y a eu un problème...',
        });

      } else {
        this._authService
          .login(p)
          .subscribe({
            next: (data => {
              this._tokenStorage.saveToken(data.accessToken);
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this._router.navigateByUrl('/person')
            }),
            error: err => {
              this.error = err.error;
              this.isLoginFailed = true;
            }
          });

      }
    }
  }

  hasErrors(control: AbstractControl | null, key: string) {
    if (control && control.errors) {
      return control.errors[key];
    }
    return null;
  }


}
