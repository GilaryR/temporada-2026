// =====================================================================
// DATOS DE LA PÁGINA: tipos de datos (interfaces), menú y la información
// de MotoGP y Fórmula 1. Es como un "archivo de datos" en JavaScript.
// =====================================================================

// ----- INTERFACES -----
// Una interface describe la forma de un objeto: qué propiedades tiene y de qué tipo.
// Sirve para que TypeScript avise si falta un dato o si el tipo está mal.

// Una carrera del calendario
export interface Carrera {
  ronda: number; // número de la fecha (1, 2, 3...)
  nombre: string; // ej. "GP de Brasil"
  circuito: string;
  pais: string;
  fecha: string; // texto para mostrar, ej. "20 – 22 mar"
  fin: string; // último día "AAAA-MM-DD", para saber si ya se corrió
  lat: number; // latitud del circuito (para la geolocalización)
  lng: number; // longitud del circuito
}

// Un equipo con sus dos pilotos
export interface Equipo {
  nombre: string;
  marca: string; // marca del motor
  color: string; // color del equipo (para el borde de la tarjeta)
  pilotos: string[]; // string[] = lista de textos
}

// Una palabra del glosario
export interface Termino {
  termino: string;
  definicion: string;
}

// Una fila de la tabla de posiciones
export interface Posicion {
  piloto: string;
  equipo: string;
  puntos: number;
}

// Toda la información de un campeonato (MotoGP o F1)
export interface Temporada {
  serie: string; // 'motogp' o 'f1'
  nombre: string;
  lema: string;
  campeon: string; // campeón 2025
  novedades: string[];
  posiciones: Posicion[]; // tabla del campeonato (top 10)
  carreras: Carrera[];
  equipos: Equipo[];
  glosario: Termino[];
}

// Un usuario registrado (se guarda en localStorage)
export interface Usuario {
  nombre: string;
  correo: string;
  clave: string;
  serieFavorita: string;
}

// ----- MENÚ -----
// Opciones del menú. Las usan la portada, la navbar y el footer con @for,
// así no se repite el mismo HTML cinco veces.
export const MENU = [
  { ruta: '/resumen', texto: 'Resumen', icono: 'iconos/resumen.png' },
  { ruta: '/carreras', texto: 'Carreras', icono: 'iconos/carreras.png' },
  { ruta: '/equipos', texto: 'Equipos', icono: 'iconos/equipos.png' },
  { ruta: '/glosario', texto: 'Glosario', icono: 'iconos/glosario.png' },
  { ruta: '/campeonato', texto: 'Campeonato', icono: 'iconos/campeonato.png' },
];

// ----- DATOS DE LA TEMPORADA 2026 -----

// Función corta para crear una carrera sin escribir el nombre de cada campo.
// Ejemplo: carrera(1, 'GP de Tailandia', 'Chang', 'Tailandia', '27 feb – 1 mar', '2026-03-01', 14.9, 103.0)
function carrera(ronda: number, nombre: string, circuito: string, pais: string, fecha: string, fin: string, lat: number, lng: number): Carrera {
  return { ronda, nombre, circuito, pais, fecha, fin, lat, lng };
}

// Datos de MotoGP (": Temporada" obliga a que tenga todos los campos de la interface)
export const MOTOGP: Temporada = {
  serie: 'motogp',
  // Posiciones oficiales al 23 de noviembre de 2026 (fuente: motogp.com)
  posiciones: [
    { piloto: 'Marc Márquez', equipo: 'Ducati Lenovo Team', puntos: 439 },
    { piloto: 'Jorge Martín', equipo: 'Aprilia Racing', puntos: 396 },
    { piloto: 'Marco Bezzecchi', equipo: 'Aprilia Racing', puntos: 394 },
    { piloto: 'Pedro Acosta', equipo: 'Red Bull KTM', puntos: 315 },
    { piloto: 'Ai Ogura', equipo: 'Trackhouse', puntos: 309 },
    { piloto: 'Fabio Di Giannantonio', equipo: 'VR46 Racing Team', puntos: 298 },
    { piloto: 'Raúl Fernández', equipo: 'Trackhouse', puntos: 283 },
    { piloto: 'Álex Márquez', equipo: 'Gresini Racing', puntos: 204 },
    { piloto: 'Francesco Bagnaia', equipo: 'Ducati Lenovo Team', puntos: 173 },
    { piloto: 'Enea Bastianini', equipo: 'KTM Tech3', puntos: 152 },
  ],
  nombre: 'Moto GP',
  lema: 'Dos ruedas, cero margen de error',
  campeon: 'Marc Márquez (Ducati)',
  novedades: [
    'Última temporada de las motos de 1000 cc: en 2027 llegan los motores de 850 cc.',
    'Brasil vuelve al calendario después de 22 años, en el circuito de Goiânia.',
    'El GP de Catar pasó de abril a noviembre por la situación en Oriente Medio.',
    'Cada fin de semana tiene carrera Sprint el sábado y carrera larga el domingo.',
  ],
  carreras: [
    carrera(1, 'GP de Tailandia', 'Chang International Circuit', 'Tailandia', '27 feb – 1 mar', '2026-03-01', 14.958, 103.084),
    carrera(2, 'GP de Brasil', 'Autódromo de Goiânia', 'Brasil', '20 – 22 mar', '2026-03-22', -16.719, -49.198),
    carrera(3, 'GP de las Américas', 'Circuit of the Americas', 'Estados Unidos', '27 – 29 mar', '2026-03-29', 30.133, -97.641),
    carrera(4, 'GP de España', 'Circuito de Jerez', 'España', '24 – 26 abr', '2026-04-26', 36.709, -6.034),
    carrera(5, 'GP de Francia', 'Le Mans', 'Francia', '8 – 10 may', '2026-05-10', 47.956, 0.224),
    carrera(6, 'GP de Cataluña', 'Barcelona-Catalunya', 'España', '15 – 17 may', '2026-05-17', 41.57, 2.261),
    carrera(7, 'GP de Italia', 'Mugello', 'Italia', '29 – 31 may', '2026-05-31', 43.998, 11.372),
    carrera(8, 'GP de Hungría', 'Balaton Park', 'Hungría', '5 – 7 jun', '2026-06-07', 47.02, 18.21),
    carrera(9, 'GP de Chequia', 'Brno', 'Chequia', '19 – 21 jun', '2026-06-21', 49.203, 16.444),
    carrera(10, 'GP de los Países Bajos', 'Assen', 'Países Bajos', '26 – 28 jun', '2026-06-28', 52.962, 6.524),
    carrera(11, 'GP de Alemania', 'Sachsenring', 'Alemania', '10 – 12 jul', '2026-07-12', 50.792, 12.688),
    carrera(12, 'GP de Gran Bretaña', 'Silverstone', 'Reino Unido', '7 – 9 ago', '2026-08-09', 52.079, -1.017),
    carrera(13, 'GP de Aragón', 'MotorLand Aragón', 'España', '28 – 30 ago', '2026-08-30', 41.079, -0.203),
    carrera(14, 'GP de San Marino', 'Misano', 'Italia', '11 – 13 sep', '2026-09-13', 43.961, 12.683),
    carrera(15, 'GP de Austria', 'Red Bull Ring', 'Austria', '18 – 20 sep', '2026-09-20', 47.22, 14.765),
    carrera(16, 'GP de Japón', 'Motegi', 'Japón', '2 – 4 oct', '2026-10-04', 36.533, 140.228),
    carrera(17, 'GP de Indonesia', 'Mandalika', 'Indonesia', '9 – 11 oct', '2026-10-11', -8.896, 116.305),
    carrera(18, 'GP de Australia', 'Phillip Island', 'Australia', '23 – 25 oct', '2026-10-25', -38.5, 145.233),
    carrera(19, 'GP de Malasia', 'Sepang', 'Malasia', '30 oct – 1 nov', '2026-11-01', 2.761, 101.738),
    carrera(20, 'GP de Catar', 'Lusail', 'Catar', '6 – 8 nov', '2026-11-08', 25.49, 51.454),
    carrera(21, 'GP de Portugal', 'Portimão', 'Portugal', '20 – 22 nov', '2026-11-22', 37.227, -8.627),
    carrera(22, 'GP de Valencia', 'Circuit Ricardo Tormo', 'España', '27 – 29 nov', '2026-11-29', 39.486, -0.628),
  ],
  equipos: [
    { nombre: 'Ducati Lenovo Team', marca: 'Ducati', color: '#d40000', pilotos: ['Marc Márquez', 'Francesco Bagnaia'] },
    { nombre: 'Aprilia Racing', marca: 'Aprilia', color: '#41b6e6', pilotos: ['Jorge Martín', 'Marco Bezzecchi'] },
    { nombre: 'Red Bull KTM', marca: 'KTM', color: '#ff6600', pilotos: ['Pedro Acosta', 'Brad Binder'] },
    { nombre: 'Honda HRC', marca: 'Honda', color: '#e4002b', pilotos: ['Joan Mir', 'Luca Marini'] },
    { nombre: 'Monster Energy Yamaha', marca: 'Yamaha', color: '#1b3d93', pilotos: ['Fabio Quartararo', 'Álex Rins'] },
    { nombre: 'Gresini Racing', marca: 'Ducati', color: '#6fc1e9', pilotos: ['Álex Márquez', 'Fermín Aldeguer'] },
    { nombre: 'VR46 Racing Team', marca: 'Ducati', color: '#f6e500', pilotos: ['Fabio Di Giannantonio', 'Franco Morbidelli'] },
    { nombre: 'Trackhouse', marca: 'Aprilia', color: '#2d5cc8', pilotos: ['Ai Ogura', 'Raúl Fernández'] },
    { nombre: 'KTM Tech3', marca: 'KTM', color: '#8a96c8', pilotos: ['Enea Bastianini', 'Maverick Viñales'] },
    { nombre: 'LCR Honda', marca: 'Honda', color: '#c8102e', pilotos: ['Johann Zarco', 'Diogo Moreira'] },
    { nombre: 'Pramac Yamaha', marca: 'Yamaha', color: '#7b3fe4', pilotos: ['Jack Miller', 'Toprak Razgatlıoğlu'] },
  ],
  glosario: [
    { termino: 'Sprint', definicion: 'Carrera del sábado con la mitad de vueltas. Da puntos a los nueve primeros.' },
    { termino: 'Holeshot', definicion: 'Mecanismo que baja la suspensión en la salida para no levantar la rueda delantera.' },
    { termino: 'Long lap', definicion: 'Sanción: el piloto debe pasar una vez por una zona más larga fuera del trazado.' },
    { termino: 'Highside', definicion: 'Caída en la que la moto lanza al piloto por encima al recuperar agarre de golpe.' },
    { termino: 'Lowside', definicion: 'Caída en la que la moto se desliza por el piso hacia el lado de la curva.' },
    { termino: 'Rebufo', definicion: 'Ir pegado detrás de otra moto para cortar menos aire y ganar velocidad.' },
    { termino: 'Flag to flag', definicion: 'Si empieza a llover, la carrera sigue y los pilotos cambian de moto en boxes.' },
    { termino: 'Vértice', definicion: 'Punto interior de la curva al que se acerca el piloto; marca la trazada ideal.' },
  ],
};

// Datos de Fórmula 1
export const F1: Temporada = {
  serie: 'f1',
  // Posiciones oficiales al 23 de noviembre de 2026 (fuente: formula1.com)
  posiciones: [
    { piloto: 'Kimi Antonelli', equipo: 'Mercedes', puntos: 402 },
    { piloto: 'Max Verstappen', equipo: 'Red Bull Racing', puntos: 304 },
    { piloto: 'Lewis Hamilton', equipo: 'Ferrari', puntos: 267 },
    { piloto: 'George Russell', equipo: 'Mercedes', puntos: 264 },
    { piloto: 'Lando Norris', equipo: 'McLaren', puntos: 264 },
    { piloto: 'Charles Leclerc', equipo: 'Ferrari', puntos: 250 },
    { piloto: 'Oscar Piastri', equipo: 'McLaren', puntos: 167 },
    { piloto: 'Isack Hadjar', equipo: 'Red Bull Racing', puntos: 122 },
    { piloto: 'Liam Lawson', equipo: 'Racing Bulls', puntos: 89 },
    { piloto: 'Pierre Gasly', equipo: 'Alpine', puntos: 52 },
  ],
  nombre: 'Formula 1',
  lema: 'La cima de la ingeniería en movimiento',
  campeon: 'Lando Norris (McLaren)',
  novedades: [
    'Nuevos motores: casi la mitad de la potencia es eléctrica y el combustible es 100 % sostenible.',
    'Se acaba el DRS: llegan la aerodinámica activa y un modo de adelantamiento.',
    'Cadillac debuta como undécimo equipo y Audi reemplaza a Sauber.',
    'Baréin y Arabia Saudita se cancelaron: el calendario queda en 22 carreras.',
  ],
  carreras: [
    carrera(1, 'GP de Australia', 'Albert Park', 'Australia', '6 – 8 mar', '2026-03-08', -37.85, 144.968),
    carrera(2, 'GP de China', 'Shanghái', 'China', '13 – 15 mar', '2026-03-15', 31.339, 121.22),
    carrera(3, 'GP de Japón', 'Suzuka', 'Japón', '27 – 29 mar', '2026-03-29', 34.843, 136.541),
    carrera(4, 'GP de Miami', 'Miami International Autodrome', 'Estados Unidos', '1 – 3 may', '2026-05-03', 25.958, -80.239),
    carrera(5, 'GP de Canadá', 'Gilles Villeneuve', 'Canadá', '22 – 24 may', '2026-05-24', 45.5, -73.523),
    carrera(6, 'GP de Mónaco', 'Montecarlo', 'Mónaco', '5 – 7 jun', '2026-06-07', 43.735, 7.421),
    carrera(7, 'GP de Barcelona', 'Barcelona-Catalunya', 'España', '12 – 14 jun', '2026-06-14', 41.57, 2.261),
    carrera(8, 'GP de Austria', 'Red Bull Ring', 'Austria', '26 – 28 jun', '2026-06-28', 47.22, 14.765),
    carrera(9, 'GP de Gran Bretaña', 'Silverstone', 'Reino Unido', '3 – 5 jul', '2026-07-05', 52.079, -1.017),
    carrera(10, 'GP de Bélgica', 'Spa-Francorchamps', 'Bélgica', '17 – 19 jul', '2026-07-19', 50.437, 5.971),
    carrera(11, 'GP de Hungría', 'Hungaroring', 'Hungría', '24 – 26 jul', '2026-07-26', 47.579, 19.249),
    carrera(12, 'GP de los Países Bajos', 'Zandvoort', 'Países Bajos', '21 – 23 ago', '2026-08-23', 52.389, 4.541),
    carrera(13, 'GP de Italia', 'Monza', 'Italia', '4 – 6 sep', '2026-09-06', 45.616, 9.281),
    carrera(14, 'GP de España', 'Madring (Madrid)', 'España', '11 – 13 sep', '2026-09-13', 40.464, -3.616),
    carrera(15, 'GP de Azerbaiyán', 'Bakú', 'Azerbaiyán', '24 – 26 sep', '2026-09-26', 40.373, 49.853),
    carrera(16, 'GP de Singapur', 'Marina Bay', 'Singapur', '9 – 11 oct', '2026-10-11', 1.291, 103.864),
    carrera(17, 'GP de Estados Unidos', 'Circuit of the Americas', 'Estados Unidos', '23 – 25 oct', '2026-10-25', 30.133, -97.641),
    carrera(18, 'GP de México', 'Hermanos Rodríguez', 'México', '30 oct – 1 nov', '2026-11-01', 19.404, -99.091),
    carrera(19, 'GP de São Paulo', 'Interlagos', 'Brasil', '6 – 8 nov', '2026-11-08', -23.704, -46.7),
    carrera(20, 'GP de Las Vegas', 'Las Vegas Strip', 'Estados Unidos', '19 – 21 nov', '2026-11-21', 36.115, -115.173),
    carrera(21, 'GP de Catar', 'Lusail', 'Catar', '27 – 29 nov', '2026-11-29', 25.49, 51.454),
    carrera(22, 'GP de Abu Dabi', 'Yas Marina', 'Emiratos Árabes', '4 – 6 dic', '2026-12-06', 24.467, 54.603),
  ],
  equipos: [
    { nombre: 'McLaren', marca: 'Mercedes', color: '#ff8000', pilotos: ['Lando Norris', 'Oscar Piastri'] },
    { nombre: 'Ferrari', marca: 'Ferrari', color: '#dc0000', pilotos: ['Charles Leclerc', 'Lewis Hamilton'] },
    { nombre: 'Red Bull Racing', marca: 'Red Bull Ford', color: '#3671c6', pilotos: ['Max Verstappen', 'Isack Hadjar'] },
    { nombre: 'Mercedes', marca: 'Mercedes', color: '#27f4d2', pilotos: ['George Russell', 'Kimi Antonelli'] },
    { nombre: 'Aston Martin', marca: 'Honda', color: '#229971', pilotos: ['Fernando Alonso', 'Lance Stroll'] },
    { nombre: 'Alpine', marca: 'Mercedes', color: '#ff87bc', pilotos: ['Pierre Gasly', 'Franco Colapinto'] },
    { nombre: 'Williams', marca: 'Mercedes', color: '#64c4ff', pilotos: ['Alexander Albon', 'Carlos Sainz'] },
    { nombre: 'Racing Bulls', marca: 'Red Bull Ford', color: '#6692ff', pilotos: ['Liam Lawson', 'Arvid Lindblad'] },
    { nombre: 'Haas', marca: 'Ferrari', color: '#b6babd', pilotos: ['Esteban Ocon', 'Oliver Bearman'] },
    { nombre: 'Audi', marca: 'Audi', color: '#bb0a30', pilotos: ['Nico Hülkenberg', 'Gabriel Bortoleto'] },
    { nombre: 'Cadillac', marca: 'Ferrari', color: '#c9c9c9', pilotos: ['Sergio Pérez', 'Valtteri Bottas'] },
  ],
  glosario: [
    { termino: 'Aerodinámica activa', definicion: 'Los alerones cambian de ángulo: menos carga en recta y más en curva.' },
    { termino: 'Modo adelantamiento', definicion: 'Energía eléctrica extra para el auto que va a menos de un segundo del de adelante.' },
    { termino: 'Undercut', definicion: 'Entrar a boxes antes que el rival para aprovechar las llantas nuevas y pasarlo.' },
    { termino: 'Pole position', definicion: 'Primer puesto de salida, para el más rápido de la clasificación.' },
    { termino: 'Safety Car', definicion: 'Auto de seguridad que agrupa a todos detrás de él cuando hay un accidente.' },
    { termino: 'VSC', definicion: 'Safety Car virtual: todos deben ir más lento sin que salga el auto de seguridad.' },
    { termino: 'Parc fermé', definicion: 'Desde la clasificación hasta la carrera casi no se puede cambiar nada del auto.' },
    { termino: 'Graining', definicion: 'Bolitas de caucho que se forman en la llanta y le quitan agarre.' },
  ],
};

// Devuelve los datos del campeonato pedido.
// Si recibe 'f1' devuelve F1; con cualquier otra cosa devuelve MOTOGP.
// Todas las páginas la usan así: obtenerTemporada(this.serie())
export function obtenerTemporada(serie: string): Temporada {
  return serie === 'f1' ? F1 : MOTOGP;
}
