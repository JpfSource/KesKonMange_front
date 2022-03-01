import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.scss']
})
export class PersonAddComponent implements OnInit {


  personForm!: FormGroup;
  person!: Person | null;

  constructor(
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _userService: UserService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.personForm = this._fb.group({
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      dateNaissance: ['', Validators.required],
      emailCreateur:[''],
      id: ['']
    });

    this._personService.person$.subscribe((p: Person) => {
      this.person = p;
      this.personForm.controls['nom'].setValue(this.person.nom);
      this.personForm.controls['prenom'].setValue(this.person?.prenom);
      this.personForm.controls['description'].setValue(this.person?.description);
      this.personForm.controls['dateNaissance'].setValue(this.person?.dateNaissance);
      this.personForm.controls['emailCreateur'].setValue(this._userService.decodedToken.email);
    });
  }

  submitForm() {
    if (this.personForm.valid) {
      const p = { ...this.person, ...this.personForm.value };
      this._personService.createPerson(p).subscribe();
    }
  }

  goBack(): void {
    this._router.navigateByUrl('/user')
  }
}
