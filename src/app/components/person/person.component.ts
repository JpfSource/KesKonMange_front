import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  public person?: Person | null;

  constructor(
    private _personService : PersonService,
    private _route: ActivatedRoute,
    private _router : Router
  ) { }

  getPrenomNom(){
    return this.person?.prenom +" "+ this.person?.nom?.toUpperCase();
  }
  
  ngOnInit(): void {
    this._personService.person$.subscribe(p => {
      this.person = p;
    })

    this._route.paramMap.subscribe(param => {
      const personId = Number(param.get('id'));
      if(personId != null && personId > 0) {
        this._personService.getPersonById(personId)
        .subscribe((p: Person | null) => {     
          this.person = p;
        });
      }
      else {

        this._router.navigateByUrl("/home");
      }
    });
  }
}
