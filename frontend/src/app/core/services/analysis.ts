import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateAnalysisRequest, CreatedAnalysisResponse } from '../interfaces';
import { environment } from 'app/environments';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  readonly httpService = inject(HttpClient);
  readonly apiUrl = environment.apiUrl;

  createAnalysis(request: CreateAnalysisRequest): Observable<CreatedAnalysisResponse> {
    const formData = this.buildFormData(request);

    return this.httpService
      .post<{ message: string; data: CreatedAnalysisResponse }>(`${this.apiUrl}/analysis`, formData)
      .pipe(map((response) => response.data));
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
