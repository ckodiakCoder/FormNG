import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'thank-you',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="p-4 max-w-lg mx-auto text-center">
      <h1 class="text-2xl font-bold mb-4">🎉 Thanks for sharing your info!</h1>
      <a routerLink="/" class="text-blue-500 underline">Go back to form</a>
    </div>
  `,
})
export class ThankYouComponent {}
