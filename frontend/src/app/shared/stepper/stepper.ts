import { Component, input } from '@angular/core';

export interface StepperStep {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
})
export class Stepper {
  readonly steps = input<StepperStep[]>([]);
  readonly activeStep = input(1);

  isActive(index: number) {
    return this.activeStep() === index + 1;
  }

  isCompleted(index: number) {
    return this.activeStep() > index + 1;
  }
}
