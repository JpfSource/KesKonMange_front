import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-person-identity',
  templateUrl: './person-identity.component.html',
  styleUrls: ['./person-identity.component.scss']
})
export class PersonIdentityComponent implements OnInit {

  identityForm! : FormGroup;


  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.identityForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      prenom:['', [Validators.required, Validators.minLength(2),Validators.maxLength(50) ]],
      description:[''],
      dateNaissance:['', Validators.required]
    })
  }

  submitForm(){
    /**
     * vérifier validité du form,
     * faire un patch/put en bdd -> méthoe à créer dans le service
     * person.service
     */
    console.log('Formulaire validé');

  }
}
