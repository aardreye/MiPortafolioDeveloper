import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { CitaComponent } from './cita/cita.component';
import { OlvidasteTuPasswordComponent } from './olvidaste-tu-password/olvidaste-tu-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearCuentaComponent,
    CitaComponent,
    OlvidasteTuPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
