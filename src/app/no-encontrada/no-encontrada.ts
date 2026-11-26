// PÁGINA 404 (ruta '**')
// Aparece cuando el usuario escribe una dirección que no existe, por ejemplo /hola.
// No necesita lógica: solo tiene su HTML.
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrada',
  imports: [RouterLink],
  templateUrl: './no-encontrada.html',
})
export class NoEncontrada {}