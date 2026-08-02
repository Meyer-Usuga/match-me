import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, Navbar } from 'app/shared';

@Component({
  selector: 'app-home',
  imports: [Button, Navbar, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
