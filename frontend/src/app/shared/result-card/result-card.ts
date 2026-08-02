import { Component, computed, input } from '@angular/core';

const GAUGE_CIRCUMFERENCE = 326.7;

@Component({
  selector: 'app-result-card',
  imports: [],
  templateUrl: './result-card.html',
  styleUrl: './result-card.scss',
})
export class ResultCard {
  readonly score = input(84);

  readonly gaugeOffset = computed(() => GAUGE_CIRCUMFERENCE * (1 - this.score() / 100));
}
