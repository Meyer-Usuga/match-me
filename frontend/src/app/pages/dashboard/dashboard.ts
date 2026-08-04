import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalysisService, CreatedUserAnalysisResponse, getCookie, setCookie } from '@core';
import { Navbar, Button, Gauge, Modal } from 'app/shared';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Button, Gauge, Modal, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly #analysisService = inject(AnalysisService);
  readonly listAnalyses = signal<CreatedUserAnalysisResponse[]>([]);
  readonly loading = signal(true);

  readonly skeletonCards = Array.from({ length: 6 }, (_, index) => index);

  readonly deleteTarget = signal<CreatedUserAnalysisResponse | null>(null);

  constructor() {
    this.refreshAnalyses();
  }

  refreshAnalyses() {
    this.#analysisService.getUserAnalyses().subscribe({
      next: (analyses) => {
        this.listAnalyses.set(analyses);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  closeDeleteModal() {
    this.deleteTarget.set(null);
  }

  onConfirmDelete() {
    if (!this.deleteTarget()) return;

    this.#analysisService.deleteAnalysis(this.deleteTarget()!.id).subscribe({
      next: () => {
        const current = Number(getCookie('analyses_count') ?? -1);
        setCookie('analyses_count', String(Math.max(0, current - 1)), 1);
        this.refreshAnalyses();
        this.closeDeleteModal();
      },
      error: (error) => {
        this.closeDeleteModal();
        console.error(error);
      },
    });
  }

  onDeleteRequest(item: CreatedUserAnalysisResponse) {
    this.deleteTarget.set(item);
  }

  formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
}

