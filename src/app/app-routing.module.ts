import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { PersonIdentityComponent } from './components/person/person-identity/person-identity.component';
import { PersonMorphoComponent } from './components/person/person-morpho/person-morpho.component';
import { PersonProfilComponent } from './components/person/person-profil/person-profil.component';
import { ItemPlatComponent } from './components/plats/item-plat/item-plat.component';
import { PersonPlatsComponent } from './components/plats/person-plats/person-plats.component';
import { BoardUserComponent } from './components/user/board-user/board-user.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';



const routes: Routes = [
  {
    path: "person" ,
    children: [
      {path: ":id", component: PersonProfilComponent,
      children: [
        {path: "identity", component: PersonIdentityComponent},
        {path: "morphology", component: PersonMorphoComponent}]
      },
      {path: ":id/person-plats", component: PersonPlatsComponent},
    ],
  },
  {path: "plat",
    children: [
      {path: ":id", component: ItemPlatComponent}
    ]},
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
