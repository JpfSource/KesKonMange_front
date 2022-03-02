import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlimentAllComponent } from './components/aliment/aliment-all/aliment-all.component';
import { AlimentDetailsComponent } from './components/aliment/aliment-details/aliment-details.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { PersonIdentityComponent } from './components/person/person-identity/person-identity.component';
import { PersonMorphoComponent } from './components/person/person-morpho/person-morpho.component';
import { PersonProfilComponent } from './components/person/person-profil/person-profil.component';
import { BoardUserComponent } from './components/user/board-user/board-user.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';



const routes: Routes = [
  {
    path: "person" ,
    children: [
    //permet d'avoir un seul router-outlet
      {path: ":id", component: PersonProfilComponent},
      {path: ":id/identity", component: PersonIdentityComponent},
      {path: ":id/morphology", component: PersonMorphoComponent}
    ],
  },

  {
    path:"aliments", 
    children: [
      {path: ":id", component: AlimentAllComponent},
      {path: ":pId/:aId", component: AlimentDetailsComponent}
    ],
  },

  {path:"home" , component: HomeComponent},
  { path: "signin", component: AuthComponent },
  { path: "login", component: AuthComponent },
  {path:"profil", component:ProfileComponent},
  {path:"user", canActivate:[AuthGuard], component:BoardUserComponent},
  {path:"" , redirectTo: "home", pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
