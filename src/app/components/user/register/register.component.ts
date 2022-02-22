import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/shared/interfaces/person';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signinForm!: FormGroup;
  person?: Person | null;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _route: ActivatedRoute,
    private _router: Router,
) { }
  ngOnInit(): void {

    this.signinForm = this._fb.group({
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [''],
      confirmEmail: ['', Validators.required],
      password:['', [Validators.required, Validators.minLength(4)]],
    });

  }
  submitForm(): void {
    // const p: any = {...this.person, ...this.signinForm}
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

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.signinForm.reset();
    // this._router.navigate(['/login']);
  }

}
