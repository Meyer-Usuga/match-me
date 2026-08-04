import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getCookie } from '@core';
import { Button, Navbar, ResultCard } from 'app/shared';

@Component({
  selector: 'app-home',
  imports: [Button, Navbar, ResultCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  get isLoggedIn(): boolean {
    return !!getCookie('access_token');
  }
}
