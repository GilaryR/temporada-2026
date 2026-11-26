// Configuración general de la aplicación.

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Muestra en la consola los errores que pasen en la página.
    provideBrowserGlobalErrorListeners(),

    // Activa el sistema de rutas (Angular Router) con la lista de app.routes.ts.
    provideRouter(
      routes,
      // Lo que va en la dirección, por ejemplo ?serie=f1, llega a la página como un input.
      withComponentInputBinding(),
      // Al cambiar de página, la pantalla vuelve arriba.
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
  ],
};