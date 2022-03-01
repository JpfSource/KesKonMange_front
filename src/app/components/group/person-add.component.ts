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
      email:[''],
      genre: ['', [Validators.required]],
      poids: ['', [Validators.required, Validators.min(10), Validators.max(200)]],
      taille: ['', [Validators.required, Validators.min(60), Validators.max(250)]],
      activite: ['', [Validators.required]],
      objectifCalorique: ['', [Validators.required, Validators.min(0), Validators.max(200)]],
      besoinsCaloriques: [''],
      id: ['']
    });

    this._personService.person$.subscribe((p: Person) => {
      this.person = p;
      this.personForm.controls['nom'].setValue(this.person.nom);
      this.personForm.controls['prenom'].setValue(this.person?.prenom);
      this.personForm.controls['description'].setValue(this.person?.description);
      this.personForm.controls['dateNaissance'].setValue(this.person?.dateNaissance);
      this.personForm.controls['id'].setValue(this.person.id);
      this.personForm.controls['email'].setValue(this._userService.decodedToken.email);
      // this.personForm.controls['genre'].setValue(this.person.genre);
      // this.personForm.controls['poids'].setValue(this.person.poids);
      // this.personForm.controls['taille'].setValue(this.person.taille);
      // this.personForm.controls['activite'].setValue(this.person.activite);
      // this.personForm.controls['objectifCalorique'].setValue(this.person.objectifCalorique);
      // this.personForm.controls['besoinsCaloriques'].setValue(this.person.besoinsCaloriques);
      // this.personForm.controls['id'].setValue(this.person.id);
    });
  }

  submitForm() {
    if (this.personForm.valid) {
      const p = { ...this.person, ...this.personForm.value };
      this._personService.createPerson(p).subscribe();
    }
  }

  onChangeData(){
    if (this.personForm.valid) {
      let pers = { ...this.person };
      pers.genre = this.personForm.value.genre;
      pers.poids = this.personForm.value.poids;
      pers.taille = this.personForm.value.taille;
      pers.activite = this.personForm.value.activite;
      pers.objectifCalorique = this.personForm.value.objectifCalorique;
      this._personService.changeData(pers as Person).subscribe();
    }
  }
}
