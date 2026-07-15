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

  it('should expose an accessibly named modal dialog', () => {
    const dialog = fixture.nativeElement.querySelector('dialog');
    const closeButton = fixture.nativeElement.querySelector('.modal-close');

    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-labelledby')).toBe('visit-dialog-title');
    expect(closeButton?.getAttribute('aria-label')).toBe(
      'Close schedule visit form'
    );
  });

  it('should move initial focus to the name field', () => {
    const nameInput = fixture.nativeElement.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;

    expect(nameInput.ownerDocument.activeElement).toBe(nameInput);
  });

  it('should associate validation errors with their fields', () => {
    component.submitForm();
    fixture.detectChanges();

    const nameInput = fixture.nativeElement.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;

    expect(nameInput.getAttribute('aria-invalid')).toBe('true');
    expect(nameInput.getAttribute('aria-describedby')).toBe('visit-name-error');
    expect(fixture.nativeElement.querySelector('#visit-name-error')).toBeTruthy();
  });

});
