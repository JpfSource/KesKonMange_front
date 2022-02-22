import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/shared/interfaces/person';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup = this._fb.group({
    // prenom: ['', [Validators.required, Validators.minLength(2)]],
    // nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: [''],
    // confirmEmail: ['', Validators.required],
    password:['', Validators.required],
  });

  person?: Person | null;

  isSignupFormView = false;

  isSuccessful = false;
  isSignUpFailed = false;
  error!: string;

  constructor(
    private authService: AuthService,
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _route: ActivatedRoute,
    private _router: Router,
) { }
  ngOnInit(): void {

    if (this._route.snapshot.routeConfig?.path == 'signup') {
      this.form.addControl('nom', this._fb.control('', Validators.required));
      this.form.addControl('prenom', this._fb.control('', Validators.required));
      this.isSignupFormView = true;
    }

  }
  submitForm(): void {
    console.log("form:", this.form.value);
    console.log("person", this.person);


    const p: any = {...this.person, ...this.form}
    console.log("const p: ", p);

    // const p: any = {...this.person, ...this.form}
    // // const { username, email, password } = this.form;
    // this.authService.register(p).subscribe(
    //   data => {
    //     console.log(data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isSignUpFailed = true;
    //   }
    // );
  }

  hasErrors(control: AbstractControl|null, key: string) {
    if (control && control.errors) {
      return control.errors[key];
    }
    return null;
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.form.reset();
    // this._router.navigate(['/login']);
  }

}
