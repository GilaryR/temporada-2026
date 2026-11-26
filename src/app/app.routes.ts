// RUTAS: aquí se juntan todas las páginas de la aplicación.
// Para que las dos integrantes no editen el mismo archivo, cada una tiene su propia
// lista de rutas: rutas-persona1.ts y rutas-persona2.ts.
// Los tres puntos (...) copian todos los elementos de una lista dentro de esta.
import { Routes } from '@angular/router';
import { rutasPersona1 } from './rutas-persona1';
import { rutasPersona2 } from './rutas-persona2';
import { NoEncontrada } from './no-encontrada/no-encontrada';

export const routes: Routes = [
  ...rutasPersona1,
  ...rutasPersona2,
  // '**' significa "cualquier otra dirección": muestra la página 404.
  // Debe ir de último, porque Angular revisa las rutas en orden.
  { path: '**', component: NoEncontrada },
];