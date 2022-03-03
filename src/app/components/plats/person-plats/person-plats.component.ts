import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
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
  public plats$ = new BehaviorSubject<Plat[]>([]);
  platId!: number;
  message!: string;
  filtrePlat!: string;

  typePlats:string[] = [ "Entrée","Plat principal","Dessert","Laitage","Boisson","Céréales"]

  constructor(
    private _personService : PersonService,
    private _platService : PlatService,
    private _route : ActivatedRoute,
    private _router : Router
  ) { }

private typeSelectedSubject = new BehaviorSubject<string>("");
typeSelectedAction$ = this.typeSelectedSubject.asObservable();

mesPlatsFiltres$ = combineLatest([
    this.plats$,
    this.typeSelectedAction$
  ])
  .pipe(
    map(([plats, selectedType]) =>
        plats.filter( plat => selectedType ? plat.typePlatLibelle === selectedType : true
      ))
  );

  onSelected(typePlatInput: string){
    this.typeSelectedSubject.next(typePlatInput);
  }

  getAllPlats(){
    this._platService.findAll().subscribe(plats => {
      this.plats$.next(plats);
     });
  }

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

    this.getAllPlats();

  }

    public deletePlat(id: any): void{
    this._platService.deletePlat(id).subscribe(() => {
      this.message = "Plat supprimé avec succès !"
      this.getAllPlats();
      this.mesPlatsFiltres$ = combineLatest([
        this.plats$,
        this.typeSelectedAction$
      ])
      .pipe(
        map(([plats, selectedType]) =>
            plats.filter( plat => selectedType ? plat.typePlatLibelle === selectedType : true
          ))
      );
    setTimeout(()=> this.message = "", 2500);
  });

}

}
