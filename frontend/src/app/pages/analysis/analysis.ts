import { Component, computed, inject, signal } from '@angular/core';
import { form, required, schema } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { AnalysisService, CreateAnalysisRequest, CreatedAnalysisResponse } from '@core';
import { Button, Input, Navbar, ResultCard, Stepper, StepperStep } from 'app/shared';

@Component({
  selector: 'app-analysis',
  imports: [Button, Input, Navbar, ResultCard, Stepper, RouterLink],
  templateUrl: './analysis.html',
  styleUrl: './analysis.scss',
})
export class Analysis {
  readonly analysisService = inject(AnalysisService);
  readonly result = signal<CreatedAnalysisResponse | null>(null);
  readonly analyzing = signal<boolean>(false);

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

  readonly schema = schema<CreateAnalysisRequest>((a) => {
    required(a.company);
    required(a.jobTitle);
    required(a.jobDescription);
    required(a.cvFile);
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
    this.setValue('jobDescription', value);
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
      this.activeStep.set(2);
    }
  }

  next() {
    const step = this.activeStep();

    if (step === 1) {
      if (this.request().cvFile) {
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

  async onSubmit() {
    if (!this.createAnalysisForm().valid()) {
      this.createAnalysisForm().markAsTouched();
      return;
    }

    this.analyzing.set(true);

    this.analysisService.createAnalysis(this.request()).subscribe({
      next: (analysis) => {
        this.result.set(analysis);

        console.log(analysis);
        
        this.activeStep.set(4);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.analyzing.set(false);
      },
    });
  }

  reset() {
    this.request.set({ ...this.initialRequest });
    this.createAnalysisForm().reset();
    this.activeStep.set(1);
  }
}
