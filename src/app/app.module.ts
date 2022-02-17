import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PersonProfilComponent,
    PersonMorphoComponent,
    PersonIdentityComponent,
    MenuTabsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
