// GUARD (guardia de ruta)
// Es una función que Angular ejecuta ANTES de abrir una página.
// Si devuelve true, deja entrar. Si no, manda a otra página.
// Se usa en rutas-persona1.ts: { path: 'favoritos', ..., canActivate: [authGuard] }
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
export const authGuard: CanActivateFn = () => {
const auth = inject(AuthService);
const router = inject(Router);
// Si hay un usuario con sesión iniciada, puede entrar.
if (auth.usuario()) {
return true;
}
// Si no, lo manda al login con un aviso en la dirección (?aviso=protegida).
return router.parseUrl('/login?aviso=protegida');
};
