// PÁGINA REGISTRO (ruta /registro)
// Formulario reactivo para crear una cuenta, con validaciones:
// campos obligatorios, formato de correo, longitud y contraseñas iguales.
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { AuthService } from '../servicios/auth.service';

// VALIDACIÓN PROPIA: revisa que la contraseña y la confirmación sean iguales.
// Devuelve null si está bien, o un error { distintas: true } si no coinciden.
function clavesIguales(formulario: AbstractControl) {
  const clave = formulario.get('clave')?.value;
  const confirmar = formulario.get('confirmar')?.value;
  return clave === confirmar ? null : { distintas: true };
}

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink, Navbar, Footer],
  templateUrl: './registro.html',
})
export class Registro {
  auth = inject(AuthService);
  router = inject(Router);

  error = signal(''); // mensaje si el correo ya está registrado
  verClave = signal(false); // botón Mostrar / Ocultar contraseña

  // FORMULARIO REACTIVO: cada FormControl tiene su valor inicial y sus validaciones (Validators)
  formulario = new FormGroup(
    {
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      confirmar: new FormControl('', [Validators.required]),
      serie: new FormControl('motogp'), // campeonato favorito (botones de opción)
      terminos: new FormControl(false, [Validators.requiredTrue]), // la casilla debe estar marcada
    },
    // Validación de todo el formulario: las dos contraseñas deben ser iguales
    { validators: clavesIguales },
  );

  // Se ejecuta al enviar el formulario
  registrar(): void {
    const datos = this.formulario.value;

    // Guarda el usuario con el servicio. Devuelve false si el correo ya existe.
    // "??" significa: si el valor es null, usa un texto vacío.
    const creado = this.auth.registrar({
      nombre: datos.nombre ?? '',
      correo: (datos.correo ?? '').toLowerCase(),
      clave: datos.clave ?? '',
      serieFavorita: datos.serie ?? 'motogp',
    });

    if (creado) {
      // Va al login con el aviso "Cuenta creada"
      this.router.navigate(['/login'], { queryParams: { aviso: 'registrado' } });
    } else {
      this.error.set('Ya existe una cuenta con ese correo.');
    }
  }
}