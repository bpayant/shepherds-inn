import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleVisitForm } from './schedule-visit-form';
import {
  ClientLogger,
  SilentClientLogger
} from '../../shared/logging/client-logger';

describe('ScheduleVisitForm', () => {
  let component: ScheduleVisitForm;
  let fixture: ComponentFixture<ScheduleVisitForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleVisitForm],
      providers: [
        provideHttpClient(),
        { provide: ClientLogger, useClass: SilentClientLogger }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleVisitForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
