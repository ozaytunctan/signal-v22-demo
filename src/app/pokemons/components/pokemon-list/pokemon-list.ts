import { Component, input, OnInit } from '@angular/core';
import { SimplePokemon } from '../../interfaces/pokemon-item.interface';
import { PokemonCard } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-list',
  template: `
    <div class="gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
      @for (pokemon of pokemons(); track pokemon.id) {
        <pokemon-card [pokemon]="pokemon" />
      }
    </div>
  `,
  imports: [PokemonCard],
})
export class PokemonList {
  pokemons = input.required<SimplePokemon[]>();
}
