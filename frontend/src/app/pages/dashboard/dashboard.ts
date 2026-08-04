import { Component, signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AnalysisService } from '@core';
import { Navbar, Button } from 'app/shared';

interface MockAnalysis {
  id: string;
  company: string;
  jobTitle: string;
  score: number;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Button, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly analysisService = inject(AnalysisService);
  readonly listAnalyses = toSignal(this.analysisService.getUserAnalyses(), { initialValue: []});
  readonly showEmpty = signal(false);

  readonly allMocks: MockAnalysis[] = [
    {
      id: '1',
      company: 'Google',
      jobTitle: 'Senior Frontend Developer',
      score: 87,
      date: 'Hace 2 horas',
    },
    {
      id: '2',
      company: 'Stripe',
      jobTitle: 'Software Engineer (React/TypeScript)',
      score: 94,
      date: 'Ayer',
    },
    {
      id: '3',
      company: 'Netflix',
      jobTitle: 'UI Engineer',
      score: 62,
      date: 'Hace 3 días',
    },
    {
      id: '4',
      company: 'MercadoLibre',
      jobTitle: 'Fullstack Engineer',
      score: 75,
      date: 'Hace 1 semana',
    },
  ];

  readonly analyses = computed(() => {
    return this.showEmpty() ? [] : this.allMocks;
  });

  toggleMocks() {
    this.showEmpty.update((prev) => !prev);
  }
}

