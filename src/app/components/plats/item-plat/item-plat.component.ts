import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Plat } from 'src/app/shared/models/plat';
import { PlatService } from 'src/app/shared/services/plat.service';

@Component({
  selector: 'app-item-plat',
  templateUrl: './item-plat.component.html',
  styleUrls: ['./item-plat.component.scss']
})
export class ItemPlatComponent implements OnInit {

  plat!: Plat;
  plats$ = new BehaviorSubject<Plat [] | any>([]);
  status!: string;

  constructor(
    private _platService: PlatService,
    private _route : ActivatedRoute,
    private _http: HttpClient,
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(param => {
      const platId = Number(param.get('id'));
      if(platId != null && platId > 0) {
        this._platService.getPlatById(platId);
        this._platService.plat$.subscribe((pl: Plat) => {
          this.plat = pl;
        });
      }
    });

  }

  public deletePlat(): void {
    // console.log(this.plat);
    // if ( this.plat != null && this.plat.id > 0) {
    // this._platService.deletePlat(this.plat?.id)
    // };
    this._platService.deletePlat(10);
  }

}

