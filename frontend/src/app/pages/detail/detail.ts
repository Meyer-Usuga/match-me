import { Component, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalysisDetailResponse, AnalysisService } from '@core';
import { Button, Navbar, ResultCard } from 'app/shared';

@Component({
  selector: 'app-detail',
  imports: [Navbar, ResultCard, Button, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {
  readonly analysisService = inject(AnalysisService);
  readonly id = input.required<string>();

  readonly analysis = signal<AnalysisDetailResponse | null>(null);
  readonly loading = signal(true);

  constructor() {
    effect(() => {
      const analysisId = this.id();
      this.loading.set(true);

      this.analysisService.getAnalysisById(analysisId).subscribe({
        next: (analysis) => {
          this.analysis.set(analysis);
          this.loading.set(false);
        },
        error: () => {
          this.analysis.set(null);
          this.loading.set(false);
        },
      });
    });
  }
}
