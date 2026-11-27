import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces/pokemon-item.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons',
  imports: [PokemonList],
  template: `
    <h1 class="text-3xl">Pokemon Listesi</h1>
    <h2 class="text-xl">Sayfa:{{ currentPage() }}</h2>
    <hr class="my-2" />

    <pokemon-list [pokemons]="pokemons()" />

    <!-- Buttons paginator-->
    <div class="flex justify-between">
      <button
        class="bg-blue-500 w-32 h-10 text-white font-bold text-sm cursor-pointer rounded-sm mt-2"
        [class.bg-slate-300]="hasBefore()"
        [disabled]="hasBefore()"
        (click)="loadPokemons(-1)">
       << Önceki Sayfa
      </button>
      <button
        class="bg-blue-500 w-32 text-white font-bold text-sm cursor-pointer rounded-sm mt-2"
        (click)="loadPokemons(+1)"
        [disabled]="hasNext()"
        [class.bg-slate-300]="hasNext()">
        Sonraki Sayfa >>
      </button>
    </div>
  `,
})
export class PokemonsPage implements OnInit {
  pokemonService = inject(PokemonService);
  pokemons = signal<SimplePokemon[]>([]);
  route = inject(ActivatedRoute);
  router = inject(Router);
  title = inject(Title);
  destroyRef = inject(DestroyRef);

  currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => Number(params.get('page') ?? 1)),
      map((page) => (Number.isFinite(page) ? Math.max(1, page) : 1)),
    ),
    { initialValue: 1 },
  );

  hasBefore = computed(() => this.currentPage() == 1);
  hasNext = computed(() => this.pokemons().length < 20);

  ngOnInit() {
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    if (this.currentPage()==1 && page < 0) {
      return;
    }

    const pageToLoad = this.currentPage()! + page;
    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(
        tap((val) => {
          this.router.navigate([], {
            queryParams: {
              page: pageToLoad,
            },
          });
          return val;
        }),

        tap(() => {
          this.title.setTitle(`Pokemon SSR| Page: ${pageToLoad}`);
        }),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: SimplePokemon[]) => this.pokemons.set(data));
  }
}
