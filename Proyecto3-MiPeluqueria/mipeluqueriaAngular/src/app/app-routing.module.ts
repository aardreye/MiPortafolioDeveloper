import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*MIS COMPONENTES*/
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { LoginComponent } from './login/login.component';
import { CitaComponent } from './cita/cita.component';
import { OlvidasteTuPasswordComponent } from './olvidaste-tu-password/olvidaste-tu-password.component';
/*MIS COMPONENTES*/

const routes: Routes = [
  { path: "crear-cuenta", component: CrearCuentaComponent },
  { path: "login", component: LoginComponent },
  { path: "cita", component: CitaComponent},
  { path: "olvide", component: OlvidasteTuPasswordComponent},
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
