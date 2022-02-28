import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonIdentityComponent } from './components/person/person-identity/person-identity.component';
import { PersonMorphologyComponent } from './components/person/person-morphology/person-morphology.component';
import { PersonComponent } from './components/person/person.component';

const routes: Routes = [
  {
    path: "person" ,
    children: [
      {path: ":id", component: PersonComponent,
      children: [
        {path: "identity", component: PersonIdentityComponent},
        {path: "morphology", component: PersonMorphologyComponent}]
      },
    ],
  },
  {path:"" , redirectTo: "home", pathMatch:'full'},
  {path:"home" , component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
