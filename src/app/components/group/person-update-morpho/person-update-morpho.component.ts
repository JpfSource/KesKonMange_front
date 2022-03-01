import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-person-update-morpho',
  templateUrl: './person-update-morpho.component.html',
  styleUrls: ['./person-update-morpho.component.scss']
})
export class PersonUpdateMorphoComponent implements OnInit {

  morphologyGpeForm!: FormGroup;
  person!: Person | null;

  constructor(
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.morphologyGpeForm = this._fb.group({
      genre: ['', [Validators.required]],
      poids: ['', [Validators.required, Validators.min(10), Validators.max(200)]],
      taille: ['', [Validators.required, Validators.min(60), Validators.max(250)]],
      activite: ['', [Validators.required]],
      objectifCalorique: ['', [Validators.required, Validators.min(0), Validators.max(200)]],
      besoinsCaloriques: [''],
      id: ['']
    });

    this._route.paramMap.subscribe(p => {
      const id = +(p.get('id')!);
      this._personService.getPersonById(id).subscribe(data => this.person = data);
    })

    this._personService.person$.subscribe((p: Person) => {
      this.person = p;
      this.morphologyGpeForm.controls['genre'].setValue(this.person.genre);
      this.morphologyGpeForm.controls['poids'].setValue(this.person.poids);
      this.morphologyGpeForm.controls['taille'].setValue(this.person.taille);
      this.morphologyGpeForm.controls['activite'].setValue(this.person.activite);
      this.morphologyGpeForm.controls['objectifCalorique'].setValue(this.person.objectifCalorique);
      this.morphologyGpeForm.controls['besoinsCaloriques'].setValue(this.person.besoinsCaloriques);
      this.morphologyGpeForm.controls['id'].setValue(this.person.id);
    });

  }

  submitForm() {

    if (this.morphologyGpeForm.valid) {
      const p = { ...this.person, ...this.morphologyGpeForm.value };
      this._personService.update(p).subscribe();
    }
  }

  onChangeData(){
    if (this.morphologyGpeForm.valid) {
      let pers = { ...this.person };
      pers.genre = this.morphologyGpeForm.value.genre;
      pers.poids = this.morphologyGpeForm.value.poids;
      pers.taille = this.morphologyGpeForm.value.taille;
      pers.activite = this.morphologyGpeForm.value.activite;
      pers.objectifCalorique = this.morphologyGpeForm.value.objectifCalorique;
      this._personService.changeData(pers as Person).subscribe();
    }
  }

  goBack(): void {
    this._router.navigateByUrl('/user')
  }
}
