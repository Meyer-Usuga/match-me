import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly type = input<'text' | 'email' | 'password' | 'textarea'>('text');
  readonly placeholder = input('');
  readonly autocomplete = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly rows = input(5);
}
