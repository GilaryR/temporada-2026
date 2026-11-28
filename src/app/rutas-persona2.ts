// RUTAS DE PERSONA 2: formularios, carreras, equipos y glosario.
// Solo Persona 2 edita este archivo. Cada ruta dice qué página (componente)
// se muestra en cada dirección. Ejemplo: /carreras muestra el componente Carreras.
import { Routes } from '@angular/router';
import { Carreras } from './carreras/carreras';
import { Equipos } from './equipos/equipos';
import { Glosario } from './glosario/glosario';
import { Login } from './login/login';
import { Registro } from './registro/registro';

export const rutasPersona2: Routes = [
  // Formularios
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  // Páginas
  { path: 'carreras', component: Carreras },
  { path: 'equipos', component: Equipos },
  { path: 'glosario', component: Glosario },
];