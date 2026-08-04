import { Component, computed, input } from '@angular/core';
import { AiResult } from '@core';
import { Gauge } from '../gauge/gauge';

@Component({
  selector: 'app-result-card',
  imports: [Gauge],
  templateUrl: './result-card.html',
  styleUrl: './result-card.scss',
})
export class ResultCard {
  readonly score = input(84);
  readonly company = input<string>();
  readonly jobTitle = input<string>();
  readonly matchedSkills = input<string[]>([
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'Docker',
    'AWS',
  ]);
  readonly missingSkills = input<string[]>(['Kubernetes', 'GraphQL', 'CI/CD avanzado']);
  readonly aiResult = input<AiResult>({
    summary:
      'Tu perfil coincide en gran parte con la oferta. Dominas el stack principal, con oportunidades de mejora en el área cloud y testing.',
    strengths: ['Sólida base en TypeScript', 'Experiencia con React', 'Conocimiento de Node.js'],
    weaknesses: ['Poca experiencia cloud', 'Sin testing automatizado'],
    recommendations: [
      'Fortalecer experiencia en arquitectura cloud',
      'Añadir proyectos con testing automatizado',
      'Destacar logros cuantificables en tu rol actual',
    ],
    improvementPriority: [],
  });

  readonly preview = input(false);

  readonly previewSummary = computed(() => {
    const summary = this.aiResult().summary;
    return summary.length > 80 ? `${summary.slice(0, 80).trimEnd()}...` : summary;
  });
}
