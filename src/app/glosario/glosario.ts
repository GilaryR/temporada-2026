// PÁGINA GLOSARIO (ruta /glosario)
// Lista de términos de las carreras con un buscador.
import { Component, input, signal } from '@angular/core';
import { Termino, obtenerTemporada } from '../datos';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-glosario',
  imports: [Navbar, Footer],
  templateUrl: './glosario.html',
})
export class Glosario {
  serie = input('motogp'); // viene de la dirección: /glosario?serie=f1
  busqueda = signal(''); // lo que el usuario escribe en el buscador

  datos() {
    return obtenerTemporada(this.serie());
  }

  // Se ejecuta cada vez que el usuario escribe una letra (evento input).
  // Guarda el texto en minúsculas para comparar sin importar mayúsculas.
  buscar(evento: Event): void {
    this.busqueda.set((evento.target as HTMLInputElement).value.toLowerCase());
  }

  // Términos cuyo nombre o definición contienen el texto buscado
  terminosFiltrados(): Termino[] {
    return this.datos().glosario.filter(
      (t) =>
        t.termino.toLowerCase().includes(this.busqueda()) ||
        t.definicion.toLowerCase().includes(this.busqueda()),
    );
  }
}