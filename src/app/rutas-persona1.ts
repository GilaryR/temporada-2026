// RUTAS DE PERSONA 1: portada, páginas de información y favoritos.
// Cada ruta dice qué página (componente)
// se muestra en cada dirección. Ejemplo: /resumen muestra el componente Resumen.
import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Campeonato } from './campeonato/campeonato';
import { Resumen } from './resumen/resumen';
import { Favoritos } from './favoritos/favoritos';
import { authGuard } from './servicios/auth.guard';

export const rutasPersona1: Routes = [
    // path: '' es la página principal (la portada del mockup)
  { path: '', component: Inicio },
  { path: 'resumen', component: Resumen },
  { path: 'campeonato', component: Campeonato },
  // Ruta protegida: canActivate usa el guard para dejar entrar solo a usuarios con sesión
  { path: 'favoritos', component: Favoritos, canActivate: [authGuard] },
];