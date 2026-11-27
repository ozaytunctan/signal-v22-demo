import { effect, signal, Signal } from '@angular/core';

export function withDebounce<T>(source: Signal<T>, delayInMs = 300): Signal<T> {
  const debounceState = signal<T>(source());

  let timeout: ReturnType<typeof setTimeout>;

  effect((onCleanup) => {
    const value = source();

    timeout = setTimeout(() => {
      debounceState.set(value);
    }, delayInMs);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  return debounceState.asReadonly();
}
