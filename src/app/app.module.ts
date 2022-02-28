import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PersonProfilComponent } from './components/person/person-profil/person-profil.component';
import { PersonMorphoComponent } from './components/person/person-morpho/person-morpho.component';
import { PersonIdentityComponent } from './components/person/person-identity/person-identity.component';
import { MenuTabsComponent } from './components/menu-tabs/menu-tabs.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/user/profile/profile.component';
import { BoardUserComponent } from './components/user/board-user/board-user.component';
import { AuthComponent } from './components/auth/auth.component';
import { PersonPlatsComponent } from './components/plats/person-plats/person-plats.component';
import { ItemPlatComponent } from './components/plats/item-plat/item-plat.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PersonProfilComponent,
    PersonMorphoComponent,
    PersonIdentityComponent,
    MenuTabsComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    AuthComponent,
    PersonPlatsComponent,
    ItemPlatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
