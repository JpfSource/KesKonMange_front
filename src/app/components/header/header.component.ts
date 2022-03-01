import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public isLoggedIn!: boolean|null;

  public person?: Person | null;

  constructor(
    private _personService : PersonService,
    private _route: ActivatedRoute,
    private _router : Router,
    private _userService: UserService,
  ) { }

  getPrenomNom(){
    return this.person?.prenom +" "+ this.person?.nom?.toUpperCase();
  }

  ngOnInit(): void {
    this._personService.person$.subscribe(p => {
      this.person = p;
    })

    this._route.paramMap.subscribe(param => {
      const personId = this._userService.decodedToken.id;
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
