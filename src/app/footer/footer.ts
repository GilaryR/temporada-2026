// FOOTER (pie de página)
// Componente reutilizable: se pone en todas las páginas con <app-footer />
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MENU } from '../datos';
import { CookiesService } from '../servicios/cookies.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  cookies = inject(CookiesService); // para mostrar el estado de las cookies y borrarlas
  menu = MENU; // los mismos enlaces del menú
}