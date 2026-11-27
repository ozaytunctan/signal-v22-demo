import { signal, WritableSignal } from '@angular/core';

export type StateUpdater<T> = T | ((prev: T) => T);

export type StateSetter<T> = (value: StateUpdater<T>) => void;

export type WithStateReturn<T> = {
  state: WritableSignal<T>;
  setState: StateSetter<T>;
};

export function withState<T>(initialValue: T): WithStateReturn<T> {
  const state = signal<T>(initialValue);

  const setState: StateSetter<T> = (value) => {
    if (typeof value === 'function') {
      state.update(value as (prev: T) => T);
    } else {
      state.set(value);
    }
  };

  // return [state, setState];
  return {
    state: state,
    setState: setState,
  };
}
