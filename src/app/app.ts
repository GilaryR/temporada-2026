// COMPONENTE PRINCIPAL (App): es el que se dibuja dentro de <app-root> en index.html.
<<<<<<< HEAD
// Muestra la página de la ruta actual y el banner de cookies.
=======
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
>>>>>>> develop

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookiesService } from './servicios/cookies.service';

// @Component convierte la clase en un componente de Angular:
// - selector: el nombre de la etiqueta HTML (<app-root>)
// - imports: lo que usa en su HTML (RouterOutlet = el espacio donde van las páginas)
// - templateUrl: el archivo HTML de este componente
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
<<<<<<< HEAD
export class App {
  // inject() trae el servicio de cookies para usarlo en el HTML (banner).
  cookies = inject(CookiesService);
}
=======
export class App {}
>>>>>>> develop
