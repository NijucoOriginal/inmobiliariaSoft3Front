import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
//import {HomeAdminComponent} from './componentes/home-admin/home-admin.component';
import {HomeUserComponent} from './componentes/home-user/home-user.component';
import {UnauthorizedComponent} from './componentes/unauthorized/unauthorized.component';
import {RegistroInmuebleComponent} from './componentes/registro-inmueble/registro-inmueble.component';

import {authGuard} from './guards/auth.guard';
import {rolesGuard} from './guards/roles.guard';


export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [authGuard]  },
  { path: 'home-user', component: HomeUserComponent, canActivate: [rolesGuard], data: { expectedRoles: ["USER"] } },
  //{ path: 'home-admin', component: HomeAdminComponent, canActivate: [rolesGuard], data: { expectedRoles: ["ADMIN"] } },
  {path: 'registroInmueble', component: RegistroInmuebleComponent, canActivate: [authGuard]},
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
