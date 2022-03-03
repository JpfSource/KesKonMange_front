import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, map, Observable, tap } from 'rxjs';
import { CriteriaComponent } from 'src/app/shared/criteria/criteria.component';
import { Person } from 'src/app/shared/models/person';
import { Plat } from 'src/app/shared/models/plat';
import { PersonService } from 'src/app/shared/services/person.service';
import { PlatService } from 'src/app/shared/services/plat.service';

@Component({
  selector: 'app-person-plats',
  templateUrl: './person-plats.component.html',
  styleUrls: ['./person-plats.component.scss']
})
export class PersonPlatsComponent implements OnInit, AfterViewInit {

  filtre!: string;
  person!: Person | null;
  plat!: Plat;
  public plats$ = new BehaviorSubject<Plat[]>([]);
  platId!: number;
  message!: string;
  filtrePlat!: string;

  //POUR LA RECHERCHE PAR MOTS CLES
  //******************
  @ViewChild(CriteriaComponent)
  filterComponent!: CriteriaComponent;
  parentListFilter!: string;
  //******************

  typePlats: string[] = ["Entrée", "Plat principal", "Dessert", "Laitage", "Boisson", "Céréales"]

  constructor(
    private _personService: PersonService,
    private _platService: PlatService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  //******************
  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }
  //******************
  private typeSelectedSubject = new BehaviorSubject<string>("");
  typeSelectedAction$ = this.typeSelectedSubject.asObservable();

  // mesPlatsFiltres$ = new BehaviorSubject<Plat[]>([]);
  mesPlatsFiltres$ = combineLatest([
    this.plats$,
    this.typeSelectedAction$
  ])
    .pipe(
      map(([plats, selectedType]) =>
        plats.filter(plat => selectedType ? plat.typePlatLibelle === selectedType : true
        ))
    );

  onSelected(typePlatInput: string) {
    this.typeSelectedSubject.next(typePlatInput);
  }

  getAllPlats(): void {
    this._platService.findAll().subscribe(plats => {
      this.plats$.next(plats);
      this.performFilter(this.parentListFilter);
    });
  }

  //******************
  onValueChange(value: string): void {
    this.performFilter(value);
  }

  /** NE MARCHE PAS ENCORE N'ENTRE PAS DANS LE PIPE
  */
  performFilter(filter?: string): void {
    console.log("event list");

    this.mesPlatsFiltres$.pipe(
        tap(() => console.log("dans pipe")),
        map(plats =>
          plats.filter(plat => plat.libelle?.toLocaleLowerCase().includes(filter!.toLocaleLowerCase()))
            // .indexOf(filter!.toLocaleLowerCase()) !== -1)
        ),
        tap(plats => console.log(plats)))

  }
  //******************


  ngOnInit(): void {
    this._route.paramMap.subscribe(param => {
      const personId = Number(param.get('id'));
      if (personId != null && personId > 0) {
        this._personService.getPersonById(personId);
        this._personService.person$.subscribe((p: Person | null) => {
          this.person = p;
        });
      }
    });

    this.getAllPlats();

  }

  public deletePlat(id: any): void {
    this._platService.deletePlat(id).subscribe(() => {
      this.message = "Plat supprimé avec succès !"
      this.getAllPlats();
      this.mesPlatsFiltres$ = combineLatest([
        this.plats$,
        this.typeSelectedAction$
      ])
        .pipe(
          map(([plats, selectedType]) =>
            plats.filter(plat => selectedType ? plat.typePlatLibelle === selectedType : true
            ))
        );
      setTimeout(() => this.message = "", 2500);
    });

  }

}
