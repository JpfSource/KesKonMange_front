import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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

  // public person$ = new BehaviorSubject<Person | null>(null);

  id!: number;

  person!: Person | null;

  constructor(
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _route: ActivatedRoute,
    private _router: Router,
    private location: Location

  ) { }

  ngOnInit(): void {
    // this.person$ = this._personService.person$;
    //vérfier si la vakeur de person$ est null dans ce cas récuperer avec méthode getById par l'url
    if(this._personService.person$.getValue()?.id == null) {
      this._route.paramMap.subscribe(param => {

        const personId = Number(param.get('id'));

        if(personId != null && personId > 0) {
          console.log(personId);
          // this._personService.getPersonById(personId).subscribe(data => this.person$.next(data));
          this._personService.getPersonById(personId);
        }


      })
    }
    // this._personService.getPersonById(1);

    this._personService.person$.subscribe((u: Person | null) => {
      console.log(u);

      this.person = u;

      this.identityForm.controls['nom'].setValue(this.person?.nom);
      this.identityForm.controls['prenom'].setValue(this.person?.prenom);
      this.identityForm.controls['description'].setValue(this.person?.description);
      this.identityForm.controls['dateNaissance'].setValue(this.person?.dateNaissance);
      this.identityForm.controls['id'].setValue(this.person?.id);
    });
    this.initForm();
  }
  /**
   * Méthode qui permet de donner des valeurs par défaut en fonction de la BdD
   */
  initForm() {
    // this._route.paramMap.subscribe(param => {
    //   const personId = Number(param.get('id'));
    //   this.id=personId;
    // })

    // this._personService.getPersonById(this.id).subscribe(data => {
    //   // this.person$.next(data);
    //   this.person = data;
    //  this.identityForm.controls['nom'].setValue(this.person.nom);
    //   this.identityForm.controls['prenom'].setValue(this.person.prenom);
    //   this.identityForm.controls['description'].setValue(this.person.description);
    //   this.identityForm.controls['dateNaissance'].setValue(this.person.dateNaissance);
    //   this.identityForm.controls['id'].setValue(this.id);

    //   console.log(this.person.nom);
    //   console.log(this.person.urlPhoto);

    //   // this.person$.next(data);
    // });

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

      // this._route.paramMap.subscribe(param => {
      //   const personId = Number(param.get('id'));
      this._personService.updateProfil(p);

      // })
    }

  }

  //faire un navigate avec le router
  goBack(): void {
    this.location.back();
  }

  //supprimer l'abonnement dans OnDestroy
}
