import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/shared/interfaces/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-person-identity',
  templateUrl: './person-identity.component.html',
  styleUrls: ['./person-identity.component.scss']
})
export class PersonIdentityComponent implements OnInit {

  identityForm!: FormGroup;
  person!: Person | null;

  constructor(
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _route: ActivatedRoute,
    private _router: Router,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.identityForm = this._fb.group({
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: [''],
      dateNaissance: ['', Validators.required],
      id: ['']
    });

    this._personService.person$.subscribe((p: Person) => {
      this.person = p;
      this.identityForm.controls['nom'].setValue(this.person.nom);
      this.identityForm.controls['prenom'].setValue(this.person?.prenom);
      this.identityForm.controls['description'].setValue(this.person?.description);
      this.identityForm.controls['dateNaissance'].setValue(this.person?.dateNaissance);
    });

  }

  submitForm() {
    if (this.identityForm.valid) {
      this.identityForm.value.id = this.person?.id;
      const p = { ...this.person, ...this.identityForm.value };
      this._personService.updateProfil(p);
      this.goBack();
    }
  }

  goBack(): void {
    this._router.navigateByUrl("person/"+ this.person?.id);
  }
}
