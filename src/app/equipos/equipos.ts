// PÁGINA EQUIPOS (ruta /equipos)
// Muestra los equipos con sus pilotos y permite filtrarlos por marca de motor.
import { Component, input, signal } from '@angular/core';
import { Equipo, obtenerTemporada } from '../datos';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-equipos',
  imports: [Navbar, Footer],
  templateUrl: './equipos.html',
})
export class Equipos {
  serie = input('motogp'); // viene de la dirección: /equipos?serie=f1
  marcaElegida = signal('todas'); // marca elegida en los botones de filtro

  datos() {
    return obtenerTemporada(this.serie());
  }

  // Lista de marcas SIN repetir para crear los botones.
  // new Set() elimina los repetidos y ... lo vuelve a convertir en lista.
  marcas(): string[] {
    const todas = this.datos().equipos.map((e) => e.marca);
    return [...new Set(todas)];
  }

  // Equipos que se muestran según la marca elegida
  equiposFiltrados(): Equipo[] {
    if (this.marcaElegida() === 'todas') {
      return this.datos().equipos;
    }
    return this.datos().equipos.filter((e) => e.marca === this.marcaElegida());
  }
}