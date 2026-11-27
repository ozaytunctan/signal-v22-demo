import { Component, effect, model, signal, ViewEncapsulation } from '@angular/core';

export interface NotificationMessage {
  id: number;
  content: string;
  clientId: string;
}

@Component({
  selector: 'app-notification-messages',
  template: `
    <div class="notification-messages container m-2 p-2">
      <button
        (click)="changeClientId('564464')"
        class="rounded-2xl border-2 py-2 px-2 w-[150px] bg-blue-500 text-white cursor-pointer"
      >
        Close
      </button>
      @for (m of messages(); track m.id) {
        <p>{{ m.content }}</p>
      }
    </div>
  `,
  imports: [],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationMessages {
  messages = signal<NotificationMessage[]>([]);
  clientId = model.required<string>();

  constructor() {
    effect((onCleanup) => {
      debugger;
      console.log(`${this.clientId()} Client notification message received`);

      let interval = setInterval(() => {
        const newMessage: NotificationMessage = {
          id: this.messages().length + 1,
          clientId: '1',
          content: `${this.messages().length + 1} message content . `,
        };
        this.messages.update((list: NotificationMessage[]) => [...list, newMessage]);
      }, 10000);

      onCleanup(() => {
        debugger;
        console.log(`${this.clientId()} Client connection closed`);
        clearInterval(interval);
        this.messages.set([]);
      });
    });
  }

  changeClientId(newClientId: string) {
    debugger;
    this.clientId.set(newClientId);
    debugger;
  }
}
