import { Component, inject, signal } from '@angular/core';
import { email, form, required, schema } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { LoginCredentials } from '@core';
import { Button, Input, Navbar } from 'app/shared';

@Component({
  selector: 'app-login',
  imports: [Button, Input, Navbar, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);

  readonly credentials = signal<LoginCredentials>({
    email: '',
    password: '',
  });

  readonly schema = schema<LoginCredentials>((c) => {
    required(c.email);
    email(c.email);
    required(c.password);
  });

  readonly loginForm = form(this.credentials, this.schema);

  isInvalid(field: keyof LoginCredentials) {
    const state = this.loginForm[field]();
    return state.touched() && state.invalid();
  }

  onEmailChange(value: string) {
    this.setValue('email', value);
  }

  onPasswordChange(value: string) {
    this.setValue('password', value);
  }

  private setValue(field: keyof LoginCredentials, value: string) {
    this.credentials.update((current) => ({ ...current, [field]: value }));
    this.loginForm[field]().markAsTouched();
  }

  onSubmit() {
    if (!this.loginForm().valid()) {
      this.loginForm().markAsTouched();
      return;
    }

    this.router.navigate(['/home']);
  }
}
