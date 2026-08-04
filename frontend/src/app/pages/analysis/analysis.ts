import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { disabled, form, maxLength, minLength, required, schema } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { AiResult, AnalysisService, CreateAnalysisRequest, CreatedAnalysisResponse, getCookie } from '@core';
import { Button, Input, Navbar, ResultCard, Stepper, StepperStep } from 'app/shared';

const EMPTY_AI_RESULT: AiResult = {
  summary: '',
  strengths: [],
  weaknesses: [],
  recommendations: [],
  improvementPriority: [],
};

const PROGRESS_STEP_MS = 1800;

@Component({
  selector: 'app-analysis',
  imports: [Button, Input, Navbar, ResultCard, Stepper, RouterLink],
  templateUrl: './analysis.html',
  styleUrl: './analysis.scss',
})
export class Analysis implements OnDestroy {
  readonly analysisService = inject(AnalysisService);
  readonly result = signal<CreatedAnalysisResponse | null>(null);
  readonly analyzing = signal<boolean>(false);
  readonly isLoggedIn = getCookie('access_token') !== null;

  readonly progressSteps = [
    'Extrayendo skills',
    'Comparando skills',
    'Calculando match',
    'Recomendaciones',
    'Generando resultados',
  ];
  readonly progressStep = signal(0);

  private progressTimer: ReturnType<typeof setInterval> | null = null;

  readonly steps: StepperStep[] = [
    { title: 'Tu perfil', subtitle: 'Sube tu CV en PDF' },
    { title: 'Datos de la oferta', subtitle: 'Empresa y puesto' },
    { title: 'Descripción', subtitle: 'Pega la oferta laboral' },
    { title: 'Resultados', subtitle: 'Análisis de compatibilidad' },
  ];

  readonly initialRequest: CreateAnalysisRequest = {
    company: '',
    jobTitle: '',
    jobDescription: '',
    cvFile: null,
  };

  readonly request = signal<CreateAnalysisRequest>({ ...this.initialRequest });
  readonly useLastCv = signal(false);

  readonly schema = schema<CreateAnalysisRequest>((a) => {
    required(a.company);
    required(a.jobTitle);
    required(a.jobDescription);
    minLength(a.jobDescription, 500);
    maxLength(a.jobDescription, 2000);
    required(a.cvFile);
    disabled(a.cvFile, () => this.useLastCv());
  });

  readonly createAnalysisForm = form(this.request, this.schema);

  readonly activeStep = signal(1);

  readonly fileName = computed(() => this.request().cvFile?.name ?? null);

  isInvalid(field: keyof CreateAnalysisRequest) {
    const state = this.createAnalysisForm[field]();
    return state.touched() && state.invalid();
  }

  onCompanyChange(value: string) {
    this.setValue('company', value);
  }

  onJobTitleChange(value: string) {
    this.setValue('jobTitle', value);
  }

  onJobDescriptionChange(value: string) {
    const sanitize = value
      .trim()
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/[\u0000-\u001F]/g, '')
      .replace(/<[^>]*>/g, '')
      .slice(0, 10000);
    this.setValue('jobDescription', sanitize);
  }

  private setValue(field: keyof CreateAnalysisRequest, value: string) {
    this.request.update((current) => ({ ...current, [field]: value }));
    this.createAnalysisForm[field]().markAsTouched();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;

    this.request.update((value) => ({
      ...value,
      cvFile: file,
    }));

    this.createAnalysisForm.cvFile().markAsTouched();

    if (file) {
      this.useLastCv.set(false);
      this.activeStep.set(2);
    }
  }

  onUseLastCvChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.useLastCv.set(checked);

    if (checked) {
      this.request.update((value) => ({ ...value, cvFile: null }));
    }
  }

  next() {
    const step = this.activeStep();

    if (step === 1) {
      if (this.request().cvFile || this.useLastCv()) {
        this.activeStep.set(2);
      }
    } else if (step === 2) {
      const company = this.createAnalysisForm.company();
      const jobTitle = this.createAnalysisForm.jobTitle();
      company.markAsTouched();
      jobTitle.markAsTouched();

      if (company.valid() && jobTitle.valid()) {
        this.activeStep.set(3);
      }
    }
  }

  previous() {
    this.activeStep.update((step) => Math.max(1, step - 1));
  }

  goToStep(step: number) {
    this.activeStep.set(step);
  }

  onSubmit() {
    if (!this.createAnalysisForm().valid()) {
      this.createAnalysisForm().markAsTouched();
      return;
    }

    this.analyzing.set(true);
    this.startProgress();

    this.analysisService.createAnalysis(this.request()).subscribe({
      next: (analysis) => {
        this.stopProgress();
        this.result.set({
          ...analysis,
          company: analysis.company ?? this.request().company,
          jobTitle: analysis.jobTitle ?? this.request().jobTitle,
          score: analysis.score ?? 0,
          matchedSkills: analysis.matchedSkills ?? [],
          missingSkills: analysis.missingSkills ?? [],
          aiResult: analysis.aiResult ?? EMPTY_AI_RESULT,
        });
        this.analyzing.set(false);
        this.activeStep.set(4);
      },
      error: (error) => {
        console.error(error);
        this.stopProgress();
        this.analyzing.set(false);
      },
    });
  }

  private startProgress() {
    this.progressStep.set(0);
    this.progressTimer = setInterval(() => {
      this.progressStep.update((step) => Math.min(step + 1, this.progressSteps.length - 1));
    }, PROGRESS_STEP_MS);
  }

  private stopProgress() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  ngOnDestroy() {
    this.stopProgress();
  }

  reset() {
    this.request.set({ ...this.initialRequest });
    this.createAnalysisForm().reset();
    this.useLastCv.set(false);
    this.activeStep.set(1);
  }
}
