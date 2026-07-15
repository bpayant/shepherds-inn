import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageForm } from './message-form';
import {
  ClientLogger,
  SilentClientLogger
} from '../../shared/logging/client-logger';

describe('MessageForm', () => {
  let component: MessageForm;
  let fixture: ComponentFixture<MessageForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageForm],
      providers: [
        provideHttpClient(),
        { provide: ClientLogger, useClass: SilentClientLogger }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageForm);
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
    expect(dialog?.getAttribute('aria-labelledby')).toBe('message-dialog-title');
    expect(closeButton?.getAttribute('aria-label')).toBe('Close message form');
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
    expect(nameInput.getAttribute('aria-describedby')).toBe('message-name-error');
    expect(fixture.nativeElement.querySelector('#message-name-error')).toBeTruthy();
  });

});
