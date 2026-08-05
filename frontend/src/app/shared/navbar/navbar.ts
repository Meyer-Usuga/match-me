import { Component, inject, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { Button } from '../button/button';
import { getCookie, deleteCookie } from '@core';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-navbar',
  imports: [Button, RouterLink, RouterLinkActive, Modal],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnDestroy {
  private readonly router = inject(Router);
  private readonly subscription = this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe(() => this.scrollToFragment());

  readonly showAuthModal = signal(false);
  readonly menuOpen = signal(false);

  get isLoggedIn(): boolean {
    return !!getCookie('access_token');
  }

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  logout() {
    deleteCookie('access_token');
    this.router.navigate(['/login']);
  }

  onDashboardClick(event: Event) {
    if (!this.isLoggedIn) {
      event.preventDefault();
      this.showAuthModal.set(true);
    }
    this.closeMenu();
  }

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
