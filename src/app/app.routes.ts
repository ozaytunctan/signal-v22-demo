import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./components/search/search.component') //
        .then((t) => t.SearchComponent),
  },
  {
    path: 'delivery-options',
    loadComponent: () =>
      import('./components/delivery-options/delivery-options') //
        .then((t) => t.DeliveryOptions),
  },
  {
    path: 'parent',
    loadComponent: () => import('./components/parent/parent'),
  },

  {
    path: 'pokemons',
    loadComponent: () =>
      import('./pages/pokemons/pokemons-page') //
        .then((t) => t.PokemonsPage),
  },
];
