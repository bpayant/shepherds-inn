import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleVisitForm } from './schedule-visit-form';

describe('ScheduleVisitForm', () => {
  let component: ScheduleVisitForm;
  let fixture: ComponentFixture<ScheduleVisitForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleVisitForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleVisitForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
