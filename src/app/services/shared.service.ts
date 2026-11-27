import { Service, signal } from '@angular/core';

@Service()
export class SharedService {
  private _value = signal<number>(0);
  value = this._value.asReadonly();

  public incrementValue(v = 1) {
    this._value.update((cur) => cur + v);
  }

  public decrementValue(v = 1) {
    if (this._value() == 0) {
      return;
    }
    this._value.update((cur) => cur - 1);
  }
}
