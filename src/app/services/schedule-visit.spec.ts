import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ScheduleVisitRequest, ScheduleVisitService } from './schedule-visit';
import { API_SETTINGS } from '../shared/api-settings';

describe('ScheduleVisitService', () => {
  let service: ScheduleVisitService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ScheduleVisitService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should serialize preferred dates as date-only values without tour readiness', () => {
    const request: ScheduleVisitRequest = {
      name: 'Test Visitor',
      phone: '(507) 555-0100',
      email: '',
      inquiryFor: 'Myself',
      timeline: 'Immediately',
      preferredDates: ['2026-07-21', '2026-07-24'],
      website: ''
    };

    service.submitRequest(request).subscribe();

    const httpRequest = httpTesting.expectOne(
      `${API_SETTINGS.apiBaseUrl}/api/schedule-visit`
    );
    expect(httpRequest.request.method).toBe('POST');
    expect(httpRequest.request.body).toEqual(request);
    expect('tourReadiness' in httpRequest.request.body).toBe(false);

    httpRequest.flush({ success: true, message: 'Request received' });
  });
});
