// RUTAS DE PERSONA 2: formularios, carreras, equipos y glosario.
// Solo Persona 2 edita este archivo.
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';

export const rutasPersona2: Routes = [
  // Formularios
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
];