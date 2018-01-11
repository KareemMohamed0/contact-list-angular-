import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { RouterModule, Routes } from "@angular/router"

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.service';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guard/auth.guard';



const AppRoutes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] }
];
@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [ValidateService, AuthService, AuthGuard, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
