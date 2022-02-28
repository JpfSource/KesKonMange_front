import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PersonMorphologyComponent } from './components/person/person-morphology/person-morphology.component';
import { PersonIdentityComponent } from './components/person/person-identity/person-identity.component';
import { MenuTabsComponent } from './components/menu-tabs/menu-tabs.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/user/profile/profile.component';
import { BoardUserComponent } from './components/user/board-user/board-user.component';
import { AuthComponent } from './components/auth/auth.component';
import { PersonComponent } from './components/person/person.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PersonComponent,
    PersonMorphologyComponent,
    PersonIdentityComponent,
    MenuTabsComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    AuthComponent
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
