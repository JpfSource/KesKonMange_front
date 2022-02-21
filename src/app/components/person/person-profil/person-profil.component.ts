import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { Person } from 'src/app/shared/interfaces/person';

@Component({
  selector: 'app-person-profil',
  templateUrl: './person-profil.component.html',
  styleUrls: ['./person-profil.component.scss']
})
export class PersonProfilComponent implements OnInit {

  public person?: Person | null;

  constructor(
    private _personService : PersonService,
    private _route: ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(param => {
      const personId = Number(param.get('id'));
      if(personId != null && personId > 0) {
        this._personService.getPersonById(personId);
        this._personService.person$.subscribe((p: Person | null) => {
          this.person = p;
        });
      }
      else {
        this._router.navigateByUrl("/home");
      }
    });
  }
}
