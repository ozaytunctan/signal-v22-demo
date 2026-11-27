import { Component, signal } from '@angular/core';
import { withDebounce } from '../../hooks/debounced';
import { withState } from '../../hooks/with-state';

@Component({
  selector: 'search',
  template: `
    <input
      type="text"
      class="border-2 m-2 border-gray-300 outline-none"
      [value]="searchText()"
      (input)="onChangeValue($event)"
    />

    <p>Original: {{ searchText() }}</p>
    <p>Debounced: {{ debouncedSearch() }}</p>
  `,
  imports: [],
})
export class SearchComponent {
  searchText = signal('');
  debouncedSearch = withDebounce(this.searchText, 500);
  readonly counter = withState<number>(5);

  onChangeValue(event: InputEvent) {
    this.counter.setState((p) => {
      console.log(p + 1);
      return p + 1;
    });
    this.searchText.set((event as any).target.value);
  }
}
