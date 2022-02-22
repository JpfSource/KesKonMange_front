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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { BoardUserComponent } from './components/user/board-user/board-user.component';
import { AuthComponent } from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';

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
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardUserComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
