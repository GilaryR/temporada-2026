// PÁGINA MIS PILOTOS FAVORITOS (ruta /favoritos)
// - Es una ruta PROTEGIDA: el guard solo deja entrar si hay sesión iniciada.
// - Tiene DRAG AND DROP: el usuario ordena los pilotos arrastrándolos.
//   Se usa la librería de Angular CDK, que funciona con mouse y con el dedo en el celular.
// - La lista se guarda en localStorage, una para cada usuario y cada campeonato.
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from 
'@angular/cdk/drag-drop';
import { Component, OnChanges, inject, input, signal } from '@angular/core';
import { obtenerTemporada } from '../datos';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { AuthService } from '../servicios/auth.service';
@Component({
selector: 'app-favoritos',
// CdkDropList = la lista donde se puede soltar. CdkDrag = cada elemento que se puede arrastrar.
imports: [Navbar, Footer, CdkDropList, CdkDrag],
templateUrl: './favoritos.html',
})
export class Favoritos implements OnChanges {
auth = inject(AuthService); // para saber qué usuario está conectado
serie = input('motogp'); // viene de la dirección: /favoritos?serie=f1
  pilotos = signal<string[]>([]); // nombres de los pilotos en el orden del usuario
  mensaje = signal(''); // mensaje "¡Guardado!"
  // CICLO DE VIDA: ngOnChanges se ejecuta al abrir la página
  // y otra vez cada vez que cambia el input "serie" (por ejemplo, al pasar de MotoGP a F1).
  ngOnChanges(): void {
    const guardado = localStorage.getItem(this.clave());
    if (guardado) {
      // Si el usuario ya había guardado su orden, se carga ese
      this.pilotos.set(JSON.parse(guardado));
    } else {
      // Si no, se muestran todos los pilotos en el orden de los equipos.
      // flatMap junta los pilotos de todos los equipos en una sola lista.
      const equipos = obtenerTemporada(this.serie()).equipos;
      this.pilotos.set(equipos.flatMap((equipo) => equipo.pilotos));
    }
    this.mensaje.set('');
  }
  // DRAG AND DROP: se ejecuta cuando el usuario suelta un piloto.
  // evento.previousIndex = posición de donde lo tomó
  // evento.currentIndex  = posición donde lo soltó
  soltar(evento: CdkDragDrop<string[]>): void {
    const lista = [...this.pilotos()]; // copia de la lista
    moveItemInArray(lista, evento.previousIndex, evento.currentIndex); // mueve el piloto
    this.pilotos.set(lista); // guarda la lista nueva y la pantalla se actualiza
    this.mensaje.set('');
  }
  // Botón "Guardar mis favoritos": guarda el orden en localStorage
  guardar(): void {
    localStorage.setItem(this.clave(), JSON.stringify(this.pilotos()));
    this.mensaje.set('¡Tus favoritos quedaron guardados!');
  }
  // Nombre con el que se guarda en localStorage, por ejemplo "favoritos-ana@correo.com-f1".
  // Así cada usuario tiene su propia lista para MotoGP y otra para F1.
   clave(): string {
    return 'favoritos-' + this.auth.usuario()?.correo + '-' + this.serie();
  }
}