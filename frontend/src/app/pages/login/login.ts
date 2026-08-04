import { Component, inject, signal } from '@angular/core';
import { email, form, required, schema } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LoginRequest, LoginUserResponse, setCookie } from '@core';
import { Button, Input, Navbar } from 'app/shared';

@Component({
  selector: 'app-login',
  imports: [Button, Input, Navbar, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);

  readonly credentials = signal<LoginRequest>({
    email: '',
    password: '',
  });

  readonly errorMessage = signal<string | null>(null);

  readonly schema = schema<LoginRequest>((c) => {
    required(c.email);
    email(c.email);
    required(c.password);
  });

  readonly loginForm = form(this.credentials, this.schema);

  isInvalid(field: keyof LoginRequest) {
    const state = this.loginForm[field]();
    return state.touched() && state.invalid();
  }

  onEmailChange(value: string) {
    this.setValue('email', value);
  }

  onPasswordChange(value: string) {
    this.setValue('password', value);
  }

  private setValue(field: keyof LoginRequest, value: string) {
    this.credentials.update((current) => ({ ...current, [field]: value }));
    this.loginForm[field]().markAsTouched();
  }

  onSubmit() {
    if (!this.loginForm().valid()) {
      this.loginForm().markAsTouched();
      return;
    }

    this.errorMessage.set(null);

    this.#authService.loginUser(this.credentials()).subscribe({
      next: (response: LoginUserResponse) => {
        setCookie('access_token', response.accessToken, 1);
        this.#router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage.set('Correo o contraseña incorrectos.');
      },
    });
  }
}
