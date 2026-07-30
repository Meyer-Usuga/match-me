import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'app/shared';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
