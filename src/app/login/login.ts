// PÁGINA LOGIN (ruta /login)
// Formulario reactivo para iniciar sesión.
// Compara el correo y la contraseña con los usuarios registrados (AuthService).
import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { AuthService } from '../servicios/auth.service';
import { CookiesService } from '../servicios/cookies.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Navbar, Footer],
  templateUrl: './login.html',
})
export class Login {
  auth = inject(AuthService);
  cookies = inject(CookiesService);
  router = inject(Router);

  // Aviso que llega en la dirección:
  // ?aviso=registrado -> viene de crear la cuenta
  // ?aviso=protegida  -> el guard lo mandó aquí porque no tenía sesión
  aviso = input('');
  error = signal(''); // mensaje "Correo o contraseña incorrectos"
  verClave = signal(false); // botón Mostrar / Ocultar contraseña

  // FORMULARIO REACTIVO
  // Si existe la cookie "correo" (Recordarme), el campo aparece ya escrito.
  formulario = new FormGroup({
    correo: new FormControl(this.cookies.leer('correo'), [Validators.required, Validators.email]),
    clave: new FormControl('', [Validators.required]),
    recordar: new FormControl(this.cookies.leer('correo') !== ''),
  });

  // Se ejecuta al enviar el formulario (ngSubmit)
  ingresar(): void {
    const datos = this.formulario.value;
    const correo = (datos.correo ?? '').toLowerCase();
    const correcto = this.auth.login(correo, datos.clave ?? '');

    // Si el correo o la contraseña no coinciden, muestra el error y borra la contraseña
    if (!correcto) {
      this.error.set('Correo o contraseña incorrectos.');
      this.formulario.get('clave')?.reset();
      return;
    }

    // Cookie "correo" para recordar el correo (solo si marcó Recordarme y aceptó las cookies)
    if (datos.recordar && this.cookies.aceptadas()) {
      this.cookies.guardar('correo', correo, 30);
    } else {
      this.cookies.eliminar('correo');
    }

    // Va al resumen de su campeonato favorito
    const favorita = this.auth.usuario()?.serieFavorita ?? 'motogp';
    this.router.navigate(['/resumen'], { queryParams: { serie: favorita } });
  }
}