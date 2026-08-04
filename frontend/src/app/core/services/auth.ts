import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginUserResponse, RegisterRequest, RegisterResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'app/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly httpService = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  registerUser(request: RegisterRequest): Observable<RegisterResponse> {
    const requestBody = { name: request.name, email: request.email, password: request.password };
    return this.httpService.post<RegisterResponse>(`${this.apiUrl}/auth/register`, requestBody);
  }

  loginUser(request: LoginRequest): Observable<LoginUserResponse> {
    const requestBody = { email: request.email, password: request.password };
    return this.httpService.post<LoginUserResponse>(`${this.apiUrl}/auth/login`, requestBody);
  }
}
