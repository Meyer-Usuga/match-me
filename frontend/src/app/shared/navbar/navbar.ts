import { Component, inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { Button } from '../button/button';

@Component({
  selector: 'app-navbar',
  imports: [Button, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnDestroy {
  private readonly router = inject(Router);
  private readonly subscription = this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe(() => this.scrollToFragment());

  private scrollToFragment() {
    const hashIndex = this.router.url.indexOf('#');
    if (hashIndex < 0) {
      return;
    }

    const id = this.router.url.slice(hashIndex + 1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
