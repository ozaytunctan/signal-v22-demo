import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  imports: [],
  selector: 'Child',
  styles: ``,
  template: `
    <div class="w-250 bg-slate-600">
      <h2>Child</h2>
      <label>Value:{{ shared.value() }}</label>
    </div>

    <button
      class="w-80 h-10 bg-blue-500 text-white font-bold cursor-pointer rounded-sm hover:bg-blue-300  "
      (click)="shared.incrementValue()">
      Artır
    </button>
  `,
})
export class Child  {
  shared = inject(SharedService);
}
