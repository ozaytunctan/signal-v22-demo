import { Component, linkedSignal, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

export type DeliveryType = 'PTT' | 'COURIER' | 'ARAS_COURIER' | 'HEPSI_JET';
export type DeliveryState = 'IN_TRANSIT' | 'DELIVERY' | 'DELIVERED';

export interface DeliveryOption {
  id: number;
  type: DeliveryType;
  state?: DeliveryState;
  amount: number;
  name: string;
}

@Component({
  selector: 'delivery-options',
  template: `
    <div class="del/ivery-options">
      @for (option of deliveryOptions(); track option.id) {
        <label class="delivery-option">
          <input
            type="radio"
            name="deliveryType"
            [value]="option.type"
            [checked]="selectedDeliveryType() === option.type"
            (change)="selectedDeliveryType.set(option.type)"
          />

          <span>
            {{ option.name }}
          </span>

          <strong>{{ option.amount | number }} ₺</strong>
        </label>
      }

      <div class="selected-delivery">
        Seçilen teslimat:
        {{ selectedDeliveryType() }}
      </div>

      <button
        class="rounded h-10 w-42 bg-orange-300 m-1  text-sm text-white cursor-pointer hover:text-red-500"
        (click)="loadDeliveryOptions()"
      >
        Teslimat Yükle
      </button>
    </div>
  `,
  imports: [DecimalPipe],
})
export class DeliveryOptions {
  deliveryOptions = signal<DeliveryOption[]>([
    { id: 1, type: 'PTT', amount: 100, name: 'Ptt Kargo' },
    { id: 2, type: 'COURIER', amount: 150, name: 'Kurye' },
    { id: 3, type: 'ARAS_COURIER', amount: 200, name: 'Yurtiçi Kargo' },
  ]);

  // selectedDeliveryType = linkedSignal(
  //   () => this.deliveryOptions()[0]?.type ?? 'PTT'
  // );

  selectedDeliveryType = linkedSignal({
    source: this.deliveryOptions,
    computation: (options, previous) => {
      debugger;
      const previousSelection = previous?.value;
      const exists = options.some((option) => option.type === previousSelection);

      return exists ? previousSelection : (options[0]?.type ?? 'PTT');
    },
  });

  loadDeliveryOptions() {
    this.deliveryOptions.update((options) => [
      ...options,
      { id: 4, type: 'HEPSI_JET', amount: 200, name: 'Hepsi JET' },
    ]);
  }
}
