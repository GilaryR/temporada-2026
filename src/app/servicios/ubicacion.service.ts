// SERVICIO DE GEOLOCALIZACIÓN
// Le pide al navegador la ubicación del usuario y calcula distancias.
// Lo usa la página de Carreras para encontrar el circuito más cercano.
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UbicacionService {
  // Pide la ubicación. Recibe dos funciones:
  // alEncontrar -> se ejecuta si el navegador da la ubicación (latitud y longitud)
  // alFallar    -> se ejecuta si hay un error, con un mensaje para el usuario
  obtener(alEncontrar: (lat: number, lng: number) => void, alFallar: (mensaje: string) => void): void {
    // Algunos navegadores muy viejos no tienen geolocalización
    if (!navigator.geolocation) {
      alFallar('Tu navegador no permite obtener la ubicación.');
      return;
    }

    // API del navegador: muestra el aviso "¿Permitir ubicación?"
    navigator.geolocation.getCurrentPosition(
      // Si el usuario acepta:
      (posicion) => alEncontrar(posicion.coords.latitude, posicion.coords.longitude),
      // Si hay un error:
      (error) => {
        if (error.code === 1) {
          // código 1 = el usuario no dio permiso
          alFallar('No diste permiso para usar tu ubicación.');
        } else {
          // otros códigos: no se encontró la ubicación o tardó demasiado
          alFallar('No fue posible obtener tu ubicación. Intenta de nuevo.');
        }
      },
    );
  }

  // Distancia en kilómetros entre dos puntos del planeta (fórmula de Haversine).
  // Tiene en cuenta que la Tierra es redonda. 12742 = diámetro de la Tierra en km.
  distanciaKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const r = Math.PI / 180; // para pasar de grados a radianes
    const a =
      Math.sin(((lat2 - lat1) * r) / 2) ** 2 +
      Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(((lng2 - lng1) * r) / 2) ** 2;
    return Math.round(12742 * Math.asin(Math.sqrt(a)));
  }
}