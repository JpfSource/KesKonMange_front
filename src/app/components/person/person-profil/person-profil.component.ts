import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Person } from 'src/app/shared/interfaces/person';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-person-profil',
  templateUrl: './person-profil.component.html',
  styleUrls: ['./person-profil.component.scss']
})
export class PersonProfilComponent implements OnInit {

  public person$ = new BehaviorSubject<Person|null>(null);

  constructor(
    private _personService : PersonService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.person$ = this._personService.person$;
    this.route.paramMap.subscribe(param => {

      const personId = Number(param.get('id'));

      if(personId != null && personId > 0) {
        console.log(personId);
        this._personService.getPersonById(personId);
      }
      else {
        this.router.navigateByUrl("/home");
      }
    })

  }

}
