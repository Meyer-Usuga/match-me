import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateAnalysisRequest, CreatedAnalysisResponse, CreatedUserAnalysisResponse } from '../interfaces';
import { environment } from 'app/environments';
import { getCookie } from '../utils/cookie.utils';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  readonly httpService = inject(HttpClient);
  readonly apiUrl = environment.apiUrl;

  createAnalysis(request: CreateAnalysisRequest): Observable<CreatedAnalysisResponse> {
    const formData = this.buildFormData(request);
    const token = getCookie('access_token');

    if (token) {
      return this.httpService
        .post<{ message: string; data: CreatedAnalysisResponse }>(
          `${this.apiUrl}/analysis`,
          formData,
          { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) },
        )
        .pipe(map((response) => response.data));
    }

    return this.httpService
      .post<{ message: string; data: CreatedAnalysisResponse }>(
        `${this.apiUrl}/analysis/guest`,
        formData,
      )
      .pipe(map((response) => response.data));
  }

  public getUserAnalyses(): Observable<CreatedUserAnalysisResponse[]> {
    const token = getCookie('access_token');

    if (token) {
      return this.httpService
        .get<{ message: string; data: CreatedUserAnalysisResponse[] }>(
          `${this.apiUrl}/analysis/list`,
          { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
        )
        .pipe(map((response) => response.data));
    }

    return of([]);
  }

  private buildFormData(request: CreateAnalysisRequest): FormData {
    const formData = new FormData();

    formData.append('company', request.company.trim());
    formData.append('jobTitle', request.jobTitle.trim());
    formData.append('jobDescription', this.sanitizeText(request.jobDescription));

    if (request.cvFile) {
      formData.append('cv', request.cvFile);
    }

    return formData;
  }

  private sanitizeText(text: string): string {
    return text
      .trim()
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/[\u0000-\u001F]/g, '')
      .replace(/<[^>]*>/g, '')
      .slice(0, 10000);
  }
}
