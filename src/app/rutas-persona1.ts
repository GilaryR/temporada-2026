// RUTAS DE PERSONA 1: portada, páginas de información y favoritos.
// Cada ruta dice qué página (componente)
// se muestra en cada dirección. Ejemplo: /resumen muestra el componente Resumen.
import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Campeonato } from './campeonato/campeonato';
import { Resumen } from './resumen/resumen';

export const rutasPersona1: Routes = [
    // path: '' es la página principal (la portada del mockup)
  { path: '', component: Inicio },
  { path: 'resumen', component: Resumen },
  { path: 'campeonato', component: Campeonato },
];