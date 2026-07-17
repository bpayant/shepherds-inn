import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  MAX_PREFERRED_VISIT_DATES,
  SCHEDULE_VISIT_SUCCESS_MESSAGE,
  ScheduleVisitForm,
} from './schedule-visit-form';
import { ScheduleVisitRequest, ScheduleVisitService } from '../../services/schedule-visit';
import { ClientLogger, SilentClientLogger } from '../../shared/logging/client-logger';

function addDays(dateValue: string, days: number): string {
  const [year, month, day] = dateValue.split('-').map(Number);
  const date = new Date(year, month - 1, day + days);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

describe('ScheduleVisitForm', () => {
  let component: ScheduleVisitForm;
  let fixture: ComponentFixture<ScheduleVisitForm>;
  let submittedRequest: ScheduleVisitRequest | undefined;

  const scheduleVisitService = {
    submitRequest(request: ScheduleVisitRequest) {
      submittedRequest = request;
      return of({ success: true, message: 'Server response' });
    },
  };

  beforeEach(async () => {
    submittedRequest = undefined;

    await TestBed.configureTestingModule({
      imports: [ScheduleVisitForm],
      providers: [
        { provide: ScheduleVisitService, useValue: scheduleVisitService },
        { provide: ClientLogger, useClass: SilentClientLogger },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleVisitForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose an accessibly named modal dialog', () => {
    const dialog = fixture.nativeElement.querySelector('dialog');
    const closeButton = fixture.nativeElement.querySelector('.modal-close');

    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-labelledby')).toBe('visit-dialog-title');
    expect(closeButton?.getAttribute('aria-label')).toBe('Close schedule visit form');
  });

  it('should move initial focus to the name field', () => {
    const nameInput = fixture.nativeElement.querySelector('input[name="name"]') as HTMLInputElement;

    expect(nameInput.ownerDocument.activeElement).toBe(nameInput);
  });

  it('should remove tour readiness and rename the timeline question', () => {
    expect(fixture.nativeElement.querySelector('[name="tourReadiness"]')).toBeNull();
    expect(fixture.nativeElement.textContent).not.toContain('Are you ready to tour the community?');
    expect(fixture.nativeElement.textContent).toContain('What is the ideal move-in timeline?');
  });

  it('should toggle preferred dates and keep them in chronological order', () => {
    const laterDate = addDays(component.minimumPreferredDate, 4);
    const earlierDate = addDays(component.minimumPreferredDate, 2);

    component.togglePreferredDate(laterDate);
    component.togglePreferredDate(earlierDate);

    expect(component.preferredDates).toEqual([earlierDate, laterDate]);

    component.togglePreferredDate(earlierDate);

    expect(component.preferredDates).toEqual([laterDate]);
    expect(component.calendarAnnouncement).toContain('removed');
  });

  it('should prevent preferred dates before the local current date', () => {
    component.togglePreferredDate(addDays(component.minimumPreferredDate, -1));

    expect(component.preferredDates).toEqual([]);
    expect(component.errors.preferredDates).toContain('cannot be in the past');
  });

  it('should remove an individual preferred date', () => {
    const date = addDays(component.minimumPreferredDate, 1);
    component.togglePreferredDate(date);

    component.removePreferredDate(date);

    expect(component.preferredDates).toEqual([]);
  });

  it('should enforce the five-date limit', () => {
    for (let offset = 0; offset < MAX_PREFERRED_VISIT_DATES; offset++) {
      component.togglePreferredDate(addDays(component.minimumPreferredDate, offset));
    }

    component.togglePreferredDate(
      addDays(component.minimumPreferredDate, MAX_PREFERRED_VISIT_DATES),
    );

    expect(component.preferredDates).toHaveLength(MAX_PREFERRED_VISIT_DATES);
    expect(component.errors.preferredDates).toContain('up to 5');
  });

  it('should require at least one preferred visit date', () => {
    expect(component.validatePreferredDates()).toBe(false);
    expect(component.errors.preferredDates).toContain('at least one');
  });

  it('should replace the date input and add button with an inline calendar', () => {
    expect(fixture.nativeElement.querySelector('input[type="date"]')).toBeNull();
    expect(fixture.nativeElement.textContent).not.toContain('Add date');
    expect(fixture.nativeElement.querySelector('.calendar-days')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Preferred Visit Dates (select up to 5)');
    expect(fixture.nativeElement.textContent).toContain(
      "We'll contact you shortly to confirm a tour date and time.",
    );
  });

  it('should disable past calendar dates and highlight selected dates', async () => {
    const selectedDate = component.minimumPreferredDate;
    const dateButton = fixture.nativeElement.querySelector(
      `[data-date="${selectedDate}"]`,
    ) as HTMLButtonElement;

    dateButton.click();
    await fixture.whenStable();

    const selectedButton = fixture.nativeElement.querySelector(
      `[data-date="${selectedDate}"]`,
    ) as HTMLButtonElement;

    expect(selectedButton.getAttribute('aria-pressed')).toBe('true');
    expect(selectedButton.classList.contains('selected')).toBe(true);

    const pastButton = fixture.nativeElement.querySelector(
      '.calendar-day:disabled',
    ) as HTMLButtonElement | null;

    if (pastButton) {
      expect(pastButton.dataset['date']! < component.minimumPreferredDate).toBe(true);
    }
  });

  it('should expose only one calendar date in the tab order', () => {
    const tabbableDates = fixture.nativeElement.querySelectorAll('.calendar-day[tabindex="0"]');

    expect(tabbableDates).toHaveLength(1);
    expect(tabbableDates[0].getAttribute('data-date')).toBe(component.minimumPreferredDate);
  });

  it('should move calendar focus with the arrow keys', async () => {
    const nextDate = addDays(component.minimumPreferredDate, 1);
    const currentDateButton = fixture.nativeElement.querySelector(
      `[data-date="${component.minimumPreferredDate}"]`,
    ) as HTMLButtonElement;

    currentDateButton.focus();
    currentDateButton.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    await fixture.whenStable();

    expect(
      (currentDateButton.ownerDocument.activeElement as HTMLElement).dataset['date'],
    ).toBe(nextDate);
  });

  it('should associate preferred-date validation errors with the date fieldset', () => {
    component.submitForm();
    fixture.detectChanges();

    const dateFieldset = fixture.nativeElement.querySelector(
      '.preferred-dates-fieldset',
    ) as HTMLFieldSetElement;

    expect(dateFieldset.getAttribute('aria-invalid')).toBe('true');
    expect(dateFieldset.getAttribute('aria-describedby')).toContain('visit-dates-error');
  });

  it('should submit date-only values without tour readiness and show the revised success message', () => {
    component.form.name = 'Test Visitor';
    component.form.phone = '(507) 555-0100';
    component.preferredDates = [component.minimumPreferredDate];

    component.submitForm();

    expect(submittedRequest).toEqual({
      name: 'Test Visitor',
      phone: '(507) 555-0100',
      email: '',
      inquiryFor: 'Myself',
      timeline: 'Immediately',
      preferredDates: [component.minimumPreferredDate],
      website: '',
    });
    expect('tourReadiness' in submittedRequest!).toBe(false);
    expect(component.successMessage).toBe(SCHEDULE_VISIT_SUCCESS_MESSAGE);
  });
});
