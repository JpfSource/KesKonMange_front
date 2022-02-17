import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonIdentityComponent } from './components/person/person-identity/person-identity.component';
import { PersonMorphoComponent } from './components/person/person-morpho/person-morpho.component';
import { PersonProfilComponent } from './components/person/person-profil/person-profil.component';

const routes: Routes = [
  {
    path: "person" ,
    children: [
    //permet d'avoir un seul router-outlet
      {path: "", component: PersonProfilComponent},
      {path: ":id", component: PersonProfilComponent},
      {path: "identity", component: PersonIdentityComponent},
      {path: "morphology", component: PersonMorphoComponent}
    ],
  },
  // {path:"" , component: PersonProfilComponent},
  {path:"" , redirectTo: "person", pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
