import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Person } from 'src/app/shared/interfaces/person';
import { PersonService } from 'src/app/shared/services/person.service';


@Component({
  selector: 'app-person-identity',
  templateUrl: './person-identity.component.html',
  styleUrls: ['./person-identity.component.scss']
})
export class PersonIdentityComponent implements OnInit {

  identityForm!: FormGroup;

  public person$ = new BehaviorSubject<Person | null>(null);

  id!:number;

  person!:Person;

  constructor(
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();

  }
  /**
   * M
   */
  initForm(){
    this._route.paramMap.subscribe(param => {
      const personId = Number(param.get('id'));
      this.id=personId;
    })


    this._personService.getPersonById(this.id).subscribe(data => {
      this.person = data;
      this.identityForm.controls['nom'].setValue(this.person.nom);
      this.identityForm.controls['prenom'].setValue(this.person.prenom);
      this.identityForm.controls['description'].setValue(this.person.description);
      this.identityForm.controls['dateNaissance'].setValue(this.person.dateNaissance);
      this.identityForm.controls['id'].setValue(this.id);
      console.log(this.person.nom);
      // this.person$.next(data);
    });

    this.identityForm = this._fb.group({
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: [''],
      dateNaissance: ['', Validators.required],
      id: ['']
    });
  }

  submitForm() {
    /**
     * vérifier validité du form,
     * faire un patch/put en bdd -> méthoe à créer dans le service
     * person.service
     */
     console.log(this.identityForm.value);
    const p = { ...this.person, ...this.identityForm.value };
    console.log(p);

    if (this.identityForm.valid) {
      this.person$ = this._personService.person$;
      this._route.paramMap.subscribe(param => {
        const personId = Number(param.get('id'));
        this._personService.updateProfil(p, personId);
      })
    }

  }
}
