import { Component, computed, input } from '@angular/core';

const GAUGE_CIRCUMFERENCE = 326.7;

@Component({
  selector: 'app-gauge',
  imports: [],
  templateUrl: './gauge.html',
  styleUrl: './gauge.scss',
})
export class Gauge {
  readonly score = input(0);

  readonly gaugeOffset = computed(() => GAUGE_CIRCUMFERENCE * (1 - this.score() / 100));
}
