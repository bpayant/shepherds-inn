import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_SETTINGS } from '../shared/api-settings';

export interface ScheduleVisitRequest {
  name: string;
  phone: string;
  email: string;
  inquiryFor: string;
  timeline: string;
  preferredDates: string[];
  website: string;
}

export interface ScheduleVisitResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleVisitService {
  private readonly scheduleVisitUrl =
    `${API_SETTINGS.apiBaseUrl}/api/schedule-visit`;

  constructor(private http: HttpClient) {}

  submitRequest(request: ScheduleVisitRequest): Observable<ScheduleVisitResponse> {
    return this.http.post<ScheduleVisitResponse>(
      this.scheduleVisitUrl,
      request
    );
  }
}
