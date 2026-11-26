// PÁGINA RESUMEN (ruta /resumen)
// Muestra las cifras de la temporada, la próxima carrera y las novedades.
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MENU, obtenerTemporada } from '../datos';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-resumen',
  // Se importan la navbar y el footer para poder usar <app-navbar> y <app-footer> en el HTML
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './resumen.html',
})
export class Resumen {
  // input() recibe el ?serie= de la dirección. Ejemplo: /resumen?serie=f1 -> serie() vale 'f1'.
  // Si no viene nada, vale 'motogp'.
  serie = input('motogp');

  // Fecha de hoy en formato "AAAA-MM-DD" (para comparar con la fecha de cada carrera)
  hoy = new Date().toISOString().slice(0, 10);

  // Accesos rápidos: todas las secciones del menú menos "Resumen" (la primera)
  accesos = MENU.slice(1);

  // Devuelve los datos de MotoGP o de F1 según la serie
  datos() {
    return obtenerTemporada(this.serie());
  }

  // Cada equipo tiene 2 pilotos
  totalPilotos(): number {
    return this.datos().equipos.length * 2;
  }

  // Cuenta las carreras cuyo último día ya pasó
  carrerasCorridas(): number {
    return this.datos().carreras.filter((c) => c.fin < this.hoy).length;
  }

  // Porcentaje de la temporada ya corrido (para el ancho de la barra roja)
  avance(): number {
    return Math.round((this.carrerasCorridas() / this.datos().carreras.length) * 100);
  }

  // La primera carrera que todavía no termina (find devuelve el primer elemento que cumple)
  proximaCarrera() {
    return this.datos().carreras.find((c) => c.fin >= this.hoy);
  }
}