import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Person } from 'src/app/shared/models/person';
import { Plat } from 'src/app/shared/models/plat';
import { PersonService } from 'src/app/shared/services/person.service';
import { PlatService } from 'src/app/shared/services/plat.service';

@Component({
  selector: 'app-person-plats',
  templateUrl: './person-plats.component.html',
  styleUrls: ['./person-plats.component.scss']
})
export class PersonPlatsComponent implements OnInit {

  filtre!: string;
  person!: Person | null;
  plat!: Plat;
  public plats$ = new BehaviorSubject<Plat [] | any>([]);
  platsFiltres!: Plat[];
  platId!: number;
  message!: string;


  constructor(
    private _personService : PersonService,
    private _platService : PlatService,
    private _route : ActivatedRoute,
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
    });

    this._platService.findAll().subscribe(plats => {
      this.plats$.next(plats);
      this.platsFiltres = this.plats$.value;
    })
  }

  public deletePlat(id: any): void{
    this._platService.deletePlat(id).subscribe(() => {
      this.message = "Plat supprimé avec succès !"
      this._platService.findAll().subscribe(plats => {
        this.plats$.next(plats);
        this.platsFiltres = this.plats$.value;
        this.changeType(this.filtre);
    });
    setTimeout(()=> this.message = "", 2500);
  });
}

  /**
   * Methode qui permet de filtrer les plats en fonctions du type de plat renseigné
   * dans le checkbox
   * @param filter
   */
  changeType(filter?: string){
    if(filter){
      this.filtre = filter;
      this.platsFiltres = this.plats$.value.filter((p: any) => p.typePlatLibelle == filter);
    } else {
      this.platsFiltres = this.plats$.value;
    }
  }
}
