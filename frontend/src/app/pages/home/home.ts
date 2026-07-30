import { Component } from '@angular/core';
import { Button, Navbar } from 'app/shared';

@Component({
  selector: 'app-home',
  imports: [Button, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
