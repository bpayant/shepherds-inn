import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ScheduleVisitService } from './schedule-visit';

describe('ScheduleVisitService', () => {
  let service: ScheduleVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ScheduleVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
