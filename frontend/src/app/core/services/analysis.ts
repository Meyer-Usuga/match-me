import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateAnalysisRequest, CreatedAnalysisResponse } from '../interfaces';
import { environment } from 'app/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  readonly httpService = inject(HttpClient);
  readonly apiUrl = environment.apiUrl;

  createAnalysis(request: CreateAnalysisRequest): Observable<CreatedAnalysisResponse> {
    const formData = this.buildFormData(request);
    
    return this.httpService.post<CreatedAnalysisResponse>(`${this.apiUrl}/analysis`, formData);
  }

  private buildFormData(request: CreateAnalysisRequest): FormData {
    const formData = new FormData();

    Object.entries(request).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    return formData;
  }
}
