// PÁGINA CAMPEONATO (ruta /campeonato)
// Muestra la tabla de posiciones del campeonato de pilotos.
// Toda la tabla se arma en el HTML con @for; aquí solo se leen los datos.
import { Component, input } from '@angular/core';
import { obtenerTemporada } from '../datos';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-campeonato',
  imports: [Navbar, Footer],
  templateUrl: './campeonato.html',
})
export class Campeonato {
  serie = input('motogp'); // viene de la dirección: /campeonato?serie=f1

  datos() {
    return obtenerTemporada(this.serie());
  }
}