import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Child } from '../child/child';
import { SharedService } from '../../services/shared.service';

@Component({
  imports: [Child],
  selector: 'Parent',
  styles: ``,
  template: `
    <div class="w-full bg-slate-400 mt-5">
      <h2 class="text-xl">Parent</h2>

      <label>Value:{{ shared.value() }}</label>

      <button
        class="w-80 h-10 bg-blue-500 text-white font-bold cursor-pointer rounded-sm hover:bg-blue-300  "
        (click)="shared.incrementValue()">
        Artır
      </button>

      <Child></Child>
    </div>`,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Parent {
  shared = inject(SharedService);
}
