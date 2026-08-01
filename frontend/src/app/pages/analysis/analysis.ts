import { Component, signal } from '@angular/core';
import { Button, Input, Navbar } from 'app/shared';

@Component({
  selector: 'app-analysis',
  imports: [Button, Input, Navbar],
  templateUrl: './analysis.html',
  styleUrl: './analysis.scss',
})
export class Analysis {
  readonly fileName = signal<string | null>(null);

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.fileName.set(file ? file.name : null);
  }
}
