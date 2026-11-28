// PÁGINA CARRERAS (ruta /carreras)
// Muestra el calendario con filtros y usa la GEOLOCALIZACIÓN para encontrar
// los 3 circuitos más cercanos al usuario y mostrar su ubicación en un mapa.
import { Component, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Carrera, obtenerTemporada } from '../datos';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { UbicacionService } from '../servicios/ubicacion.service';

@Component({
  selector: 'app-carreras',
  imports: [Navbar, Footer],
  templateUrl: './carreras.html',
})
export class Carreras {
  ubicacion = inject(UbicacionService); // servicio de geolocalización
  sanitizer = inject(DomSanitizer); // para poder mostrar el mapa en un iframe

  serie = input('motogp'); // viene de la dirección: /carreras?serie=f1
  hoy = new Date().toISOString().slice(0, 10); // fecha de hoy "AAAA-MM-DD"

  // Variables que cambian y actualizan la pantalla (signals)
  filtro = signal('todas'); // botón elegido: 'todas', 'proximas' o 'corridas'
  buscando = signal(false); // true mientras espera la ubicación
  error = signal(''); // mensaje si falla la geolocalización
  cercanas = signal<{ carrera: Carrera; km: number }[]>([]); // las 3 carreras más cercanas
  mapa = signal<SafeResourceUrl | null>(null); // dirección del mapa (null = no hay mapa todavía)

  // Ciudades para elegir a mano si el usuario no da permiso de ubicación
  ciudades = [
    { nombre: 'Bogotá', lat: 4.711, lng: -74.072 },
    { nombre: 'Medellín', lat: 6.244, lng: -75.581 },
    { nombre: 'Cali', lat: 3.452, lng: -76.532 },
    { nombre: 'Manizales', lat: 5.07, lng: -75.514 },
    { nombre: 'Ciudad de México', lat: 19.433, lng: -99.133 },
  ];

  datos() {
    return obtenerTemporada(this.serie());
  }

  // true si el último día de la carrera ya pasó
  yaSeCorrio(carrera: Carrera): boolean {
    return carrera.fin < this.hoy;
  }

  // Devuelve las carreras según el botón de filtro elegido
  carrerasFiltradas(): Carrera[] {
    const carreras = this.datos().carreras;
    if (this.filtro() === 'proximas') {
      return carreras.filter((c) => !this.yaSeCorrio(c));
    }
    if (this.filtro() === 'corridas') {
      return carreras.filter((c) => this.yaSeCorrio(c));
    }
    return carreras; // 'todas'
  }

  // Botón "Usar mi ubicación"
  buscarUbicacion(): void {
    this.buscando.set(true);
    this.error.set('');
    this.ubicacion.obtener(
      // Si el navegador da la ubicación:
      (lat, lng) => {
        this.buscando.set(false);
        this.mostrarResultado(lat, lng);
      },
      // Si hay error (por ejemplo, no dio permiso), se muestra el mensaje:
      (mensaje) => {
        this.buscando.set(false);
        this.error.set(mensaje);
      },
    );
  }

  // Si eligió una ciudad en la lista (cuando no dio permiso)
  elegirCiudad(evento: Event): void {
    const nombre = (evento.target as HTMLSelectElement).value; // texto de la opción elegida
    const ciudad = this.ciudades.find((c) => c.nombre === nombre);
    if (ciudad) {
      this.mostrarResultado(ciudad.lat, ciudad.lng);
    }
  }

  // Calcula los circuitos más cercanos y prepara el mapa
  mostrarResultado(lat: number, lng: number): void {
    // 1. Para cada carrera, calcula la distancia en km
    const lista = this.datos().carreras.map((carrera) => ({
      carrera: carrera,
      km: this.ubicacion.distanciaKm(lat, lng, carrera.lat, carrera.lng),
    }));

    // 2. Ordena de menor a mayor distancia y se queda con las 3 primeras
    lista.sort((a, b) => a.km - b.km);
    this.cercanas.set(lista.slice(0, 3));

    // 3. Mapa de OpenStreetMap con un marcador donde está el usuario
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.3},${lat - 0.2},${lng + 0.3},${lat + 0.2}&marker=${lat},${lng}`;

    // Por seguridad, Angular bloquea direcciones externas en un iframe.
    // bypassSecurityTrustResourceUrl le dice que esta dirección es confiable.
    this.mapa.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}