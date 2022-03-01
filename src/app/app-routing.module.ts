import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { PersonAddComponent } from './components/group/person-add.component';
import { PersonUpdateMorphoComponent } from './components/group/person-update-morpho/person-update-morpho.component';
import { HomeComponent } from './components/home/home.component';
import { PersonIdentityComponent } from './components/person/person-identity/person-identity.component';
import { PersonMorphologyComponent } from './components/person/person-morphology/person-morphology.component';
import { PersonComponent } from './components/person/person.component';
import { BoardUserComponent } from './components/user/board-user/board-user.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "person" ,
    canActivate:[AuthGuard],
    component: PersonComponent,
    children: [
      {path: "identity", component: PersonIdentityComponent},
      {path: "morphology", component: PersonMorphologyComponent},

    ],
  },
  {path:"user", component:BoardUserComponent},
  {path:"createPerson" , component:PersonAddComponent},
  {path:"updateMorphoPerson/:id" , component:PersonUpdateMorphoComponent},
  {path:"home" , component: HomeComponent},
  { path: "signin", component: AuthComponent },
  { path: "login", component: AuthComponent },


  {path:"" , redirectTo: "home", pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
