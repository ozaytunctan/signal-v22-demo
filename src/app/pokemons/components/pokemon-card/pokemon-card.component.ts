import { Component, computed, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces/pokemon-item.interface';

@Component({
  selector: 'pokemon-card',
  template: `
    <div
      class="bg-blue-500 h-44 bg-opacity-25 rounded-lg shadow-md flex flex-col p-4 items-center justify-center cursor-pointer"
    >
      @if (pokemon() === null) {
        <div class="flex justify-center">
          <h1>Loading...</h1>
        </div>
      } @else {
        @let poke = this.pokemon();
        <img
          [src]="pokemonImageUrl()"
          [alt]="poke.name"
          class="w-24 h-24"
          width="96px"
          height="96px"
        />

        <div class="text-center mt-2">
          <h2 class="text-xl font-bold capitalize text-white">
            {{ poke.name }}
          </h2>
        </div>
      }
    </div>
  `,
  imports: [],
})
export class PokemonCard {
  pokemon = input.required<SimplePokemon>();
  readonly pokemonImageUrl = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`,
  );
}
