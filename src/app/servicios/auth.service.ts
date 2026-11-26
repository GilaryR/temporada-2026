// SERVICIO DE USUARIOS (autenticación)
// Se encarga del registro, el inicio de sesión y el cierre de sesión.
// Los usuarios se guardan en localStorage (en el navegador) y la sesión en la cookie "sesion".

import { Injectable, inject, signal } from '@angular/core';
import { Usuario } from '../datos';
import { CookiesService } from './cookies.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // inject() trae otro servicio para usarlo aquí adentro
  cookies = inject(CookiesService);

  // Usuario conectado, o null si no hay nadie.
  // Al abrir la página se busca el correo guardado en la cookie "sesion":
  // así, si recarga la página, la sesión sigue abierta.
  usuario = signal<Usuario | null>(this.buscar(this.cookies.leer('sesion')));

  // Lee la lista de usuarios guardada en localStorage.
  // localStorage solo guarda texto, por eso se usa JSON.parse para volverlo una lista.
  leerUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  // Busca un usuario por su correo. Devuelve el usuario o null.
  buscar(correo: string): Usuario | null {
    return this.leerUsuarios().find((u) => u.correo === correo) || null;
  }

  // REGISTRO: guarda un usuario nuevo.
  // Devuelve false si ya existe una cuenta con ese correo.
  registrar(nuevo: Usuario): boolean {
    if (this.buscar(nuevo.correo)) {
      return false;
    }
    const usuarios = this.leerUsuarios();
    usuarios.push(nuevo); // agrega el usuario a la lista
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // JSON.stringify la vuelve texto
    return true;
  }

  // LOGIN: compara el correo y la contraseña con los usuarios registrados.
  // Devuelve false si no coinciden.
  login(correo: string, clave: string): boolean {
    const usuario = this.buscar(correo);
    if (!usuario || usuario.clave !== clave) {
      return false;
    }
    this.cookies.guardar('sesion', usuario.correo, 7); // la sesión dura 7 días
    this.usuario.set(usuario); // ahora hay un usuario conectado
    return true;
  }

  // CERRAR SESIÓN: borra la cookie y deja el usuario en null.
  cerrarSesion(): void {
    this.cookies.eliminar('sesion');
    this.usuario.set(null);
  }
}