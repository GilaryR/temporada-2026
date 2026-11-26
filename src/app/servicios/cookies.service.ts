// SERVICIO DE COOKIES
// Un servicio es una clase con funciones que pueden usar varias páginas.
// Este se encarga de guardar, leer y eliminar cookies, y de manejar el banner.
//
// Cookies que usa la página:
//   sesion        -> correo del usuario conectado (mantiene la sesión abierta)
//   correo        -> recuerda el correo en el login ("Recordarme")
//   serie         -> último campeonato visitado (portada: "Continuar en...")
//   aceptaCookies -> 'si' o 'no' según lo que respondió en el banner

import { Injectable, signal } from '@angular/core';

// @Injectable con providedIn: 'root' = existe una sola copia del servicio para toda la app.
@Injectable({ providedIn: 'root' })
export class CookiesService {
  // signal: variable especial; cuando cambia, Angular actualiza la pantalla solo.
  // Vale true si el usuario todavía no ha respondido el banner de cookies.
  mostrarBanner = signal(this.leer('aceptaCookies') === '');

  // GUARDAR una cookie que dura cierta cantidad de días.
  // Ejemplo: guardar('sesion', 'ana@correo.com', 7)
  guardar(nombre: string, valor: string, dias: number): void {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias); // fecha de hoy + los días
    // Formato de una cookie: nombre=valor; expires=fecha; path=/
    document.cookie =
      nombre +
      '=' +
      encodeURIComponent(valor) +
      '; expires=' +
      fecha.toUTCString() +
      '; path=/';
  }

  // LEER una cookie. Devuelve su valor, o '' si no existe.
  // document.cookie es un texto como "sesion=ana%40correo.com; serie=f1"
  leer(nombre: string): string {
    const cookies = document.cookie.split('; '); // separa cada cookie
    for (const cookie of cookies) {
      const partes = cookie.split('='); // ["sesion", "ana%40correo.com"]
      if (partes[0] === nombre) {
        return decodeURIComponent(partes[1]);
      }
    }
    return '';
  }

  // ELIMINAR una cookie: se le pone una fecha que ya pasó y el navegador la borra.
  eliminar(nombre: string): void {
    document.cookie = nombre + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }

  // --- Banner de cookies ---

  // true si el usuario aceptó las cookies
  aceptadas(): boolean {
    return this.leer('aceptaCookies') === 'si';
  }

  // Botón "Aceptar cookies"
  aceptar(): void {
    this.guardar('aceptaCookies', 'si', 180);
    this.mostrarBanner.set(false); // .set() cambia el valor del signal y el banner se oculta
  }

  // Botón "Solo las necesarias": se borran las cookies de preferencias
  rechazar(): void {
    this.guardar('aceptaCookies', 'no', 180);
    this.eliminar('serie');
    this.eliminar('correo');
    this.mostrarBanner.set(false);
  }

  // Botón del footer "Borrar y elegir de nuevo": borra todo y vuelve a mostrar el banner
  borrarTodo(): void {
    this.eliminar('aceptaCookies');
    this.eliminar('serie');
    this.eliminar('correo');
    this.mostrarBanner.set(true);
  }

  // Recuerda el último campeonato visitado (solo si aceptó las cookies)
  guardarSerie(serie: string): void {
    if (this.aceptadas()) {
      this.guardar('serie', serie, 90);
    }
  }
}