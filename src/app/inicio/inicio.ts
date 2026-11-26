// PORTADA (página de inicio, ruta "/")
// Es el diseño del mockup: pantalla dividida en diagonal entre MotoGP y Fórmula 1.
// Al pasar el mouse por un lado, ese lado se agranda y aparecen los íconos del menú.
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MENU } from '../datos';
import { AuthService } from '../servicios/auth.service';
import { CookiesService } from '../servicios/cookies.service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
})
export class Inicio {
  auth = inject(AuthService); // para mostrar "Hola, nombre" o los botones de login
  cookies = inject(CookiesService); // para leer y guardar el campeonato preferido

  menu = MENU; // los 5 íconos del menú

  // Qué lado tiene el mouse encima: 'motogp', 'f1' o '' (ninguno).
  // Según su valor, el HTML pone las clases que mueven la diagonal.
  ladoActivo = signal('');

  // Lee la cookie "serie" (el último campeonato visitado).
  // Si existe, la portada muestra el enlace "Continuar en...".
  serieGuardada = this.cookies.leer('serie');
}