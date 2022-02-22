import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonIdentityComponent } from './components/person/person-identity/person-identity.component';
import { PersonMorphoComponent } from './components/person/person-morpho/person-morpho.component';
import { PersonProfilComponent } from './components/person/person-profil/person-profil.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';

const routes: Routes = [
  {
    path: "person" ,
    children: [
    //permet d'avoir un seul router-outlet
      {path: ":id", component: PersonProfilComponent},
      // {path: ":id", component: PersonProfilComponent},
      {path: ":id/identity", component: PersonIdentityComponent},
      {path: ":id/morphology", component: PersonMorphoComponent}
    ],
  },
  // {path:"" , component: PersonProfilComponent},
  {path:"" , redirectTo: "home", pathMatch:'full'},
  {path:"home" , component: HomeComponent},
  {path:"signin", component:RegisterComponent},
  {path:"login", component:LoginComponent},

];

// Routes testées par Steeve 18-02-2022
// const routes: Routes = [
//   { path: "", redirectTo: "home", pathMatch: 'full' },
//   { path: "home", component: HomeComponent },
//   { path: "person",
//     children: [
//       //permet d'avoir un seulrouter-outlet
//       { path: ":id", component: PersonProfilComponent,
//         children: [
//         { path: "identity", component: PersonIdentityComponent },
//         { path: "morphology", component: PersonMorphoComponent }
//         ]},
//     ]
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
