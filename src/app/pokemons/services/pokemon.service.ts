import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SimplePokemon } from '../interfaces/pokemon-item.interface';
import { PokeApiResponse, Result } from '../interfaces/poke-api-response.interface';

@Service()
export class PokemonService {
  private readonly http = inject(HttpClient);

  private readonly pageSize = 20;

  public loadPage(page: number): Observable<SimplePokemon[]> {
    const normalizedPage = Math.max(0, page - 1);
    const pageOffset = normalizedPage * this.pageSize;

    return this.http
      .get<PokeApiResponse>(
        `https://pokeapi.co/api/v2/ability/?offset=${pageOffset}&limit=${this.pageSize}`,
      )
      .pipe(
        map((resp: PokeApiResponse) => {
          const simplePokemons: SimplePokemon[] = resp.results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));
          return simplePokemons;
        }),
      );
  }
}
