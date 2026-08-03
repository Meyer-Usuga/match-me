import { Component, inject, signal } from '@angular/core';
import { email, form, required, schema } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { RegisterCredentials } from '@core';
import { Button, Input, Navbar } from 'app/shared';

@Component({
  selector: 'app-register',
  imports: [Button, Input, Navbar, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly router = inject(Router);

  readonly credentials = signal<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  readonly schema = schema<RegisterCredentials>((c) => {
    required(c.name);
    required(c.email);
    email(c.email);
    required(c.password);
    required(c.confirmPassword);
  });

  readonly registerForm = form(this.credentials, this.schema);

  isInvalid(field: keyof RegisterCredentials) {
    const state = this.registerForm[field]();
    return state.touched() && state.invalid();
  }

  confirmMismatch() {
    return (
      this.credentials().confirmPassword.length > 0 &&
      this.credentials().confirmPassword !== this.credentials().password
    );
  }

  onChange(field: keyof RegisterCredentials, value: string) {
    this.credentials.update((current) => ({ ...current, [field]: value }));
    this.registerForm[field]().markAsTouched();
  }

  onSubmit() {
    if (!this.registerForm().valid() || this.confirmMismatch()) {
      this.registerForm().markAsTouched();
      this.registerForm.confirmPassword().markAsTouched();
      return;
    }

    this.router.navigate(['/home']);
  }
}
