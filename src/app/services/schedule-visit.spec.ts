import { TestBed } from '@angular/core/testing';

import { ScheduleVisit } from './schedule-visit';

describe('ScheduleVisit', () => {
  let service: ScheduleVisit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleVisit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
