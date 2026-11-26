// NAVBAR (barra de navegación)
// Componente reutilizable: se pone en todas las páginas con <app-navbar [serie]="serie()" />
import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MENU } from '../datos';
import { AuthService } from '../servicios/auth.service';
import { CookiesService } from '../servicios/cookies.service';

@Component({
  selector: 'app-navbar',
  // RouterLink = enlaces entre páginas. RouterLinkActive = resalta el enlace de la página actual.
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {
  auth = inject(AuthService); // para saber si hay sesión y mostrar "Hola, nombre"
  cookies = inject(CookiesService); // para recordar el campeonato elegido
  router = inject(Router); // para cambiar de página desde el código

  menu = MENU; // lista de opciones del menú (está en datos.ts)

  // input() = dato que llega desde afuera. La página que usa la navbar le dice qué campeonato se ve.
  serie = input('motogp');

  // true cuando el menú hamburguesa está abierto (en el celular)
  menuAbierto = signal(false);

  // Abre o cierra el menú hamburguesa: si estaba en true lo pone en false y al revés
  cambiarMenu(): void {
    this.menuAbierto.set(!this.menuAbierto());
  }

  // Botón "Cerrar sesión": cierra la sesión y vuelve a la portada
  salir(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }
}