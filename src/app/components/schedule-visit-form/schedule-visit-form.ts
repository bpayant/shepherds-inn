import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ScheduleVisitResponse, ScheduleVisitService } from '../../services/schedule-visit';
import { ClientLogger } from '../../shared/logging/client-logger';

@Component({
  selector: 'app-schedule-visit-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './schedule-visit-form.html',
  styleUrl: './schedule-visit-form.css'
})
export class ScheduleVisitForm {
  @Output() close = new EventEmitter<void>();

  isSubmitting = false;
  successMessage = '';
  submitError = '';

  form = {
    name: '',
    phone: '',
    email: '',
    inquiryFor: 'Myself',
    tourReadiness: 'Yes, please call me to schedule a day/time',
    timeline: 'Immediately',
    website: ''
  };

  errors = {
    name: '',
    phone: '',
    email: '',
    inquiryFor: '',
    tourReadiness: '',
    timeline: ''
  };

  constructor(
    private scheduleVisitService: ScheduleVisitService,
    private changeDetectorRef: ChangeDetectorRef,
    private logger: ClientLogger
  ) {}

  closeForm(): void {
    this.close.emit();
  }

  formatPhoneNumber(): void {
    const digits = this.form.phone.replace(/\D/g, '');

    if (!digits) {
      return;
    }

    let normalized = digits;

    if (normalized.length === 11 && normalized[0] === '1') {
      normalized = normalized.slice(1);
    }

    if (normalized.length !== 10) {
      return;
    }

    this.form.phone =
      `(${normalized.slice(0, 3)}) ` +
      `${normalized.slice(3, 6)}-` +
      `${normalized.slice(6, 10)}`;
  }

  validateName(): boolean {
    this.errors.name = '';

    if (!this.form.name.trim()) {
      this.errors.name = 'Please enter your name';
      return false;
    }

    return true;
  }

  validatePhone(): boolean {
    this.errors.phone = '';

    const digits = this.form.phone.replace(/\D/g, '');

    if (digits.length === 0) {
      this.errors.phone = 'Please enter a valid phone number';
      return false;
    }

    if (digits.length !== 10) {
      this.errors.phone = 'Please enter as (###) ###-####';
      return false;
    }

    return true;
  }

  validateEmail(): boolean {
    this.errors.email = '';

    const email = this.form.email.trim();

    if (!email) {
      return true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email)) {
      this.errors.email = 'Please enter a valid email (***@***.***)';
      return false;
    }

    return true;
  }

  validateInquiryFor(): boolean {
    this.errors.inquiryFor = '';

    if (!this.form.inquiryFor) {
      this.errors.inquiryFor = 'Please select one';
      return false;
    }

    return true;
  }

  validateTourReadiness(): boolean {
    this.errors.tourReadiness = '';

    if (!this.form.tourReadiness) {
      this.errors.tourReadiness = 'Please select one';
      return false;
    }

    return true;
  }

  validateTimeline(): boolean {
    this.errors.timeline = '';

    if (!this.form.timeline) {
      this.errors.timeline = 'Please select a timeline';
      return false;
    }

    return true;
  }

  validateForm(): boolean {
    const nameIsValid = this.validateName();
    const phoneIsValid = this.validatePhone();
    const emailIsValid = this.validateEmail();
    const inquiryForIsValid = this.validateInquiryFor();
    const tourReadinessIsValid = this.validateTourReadiness();
    const timelineIsValid = this.validateTimeline();

    return (
      nameIsValid &&
      phoneIsValid &&
      emailIsValid &&
      inquiryForIsValid &&
      tourReadinessIsValid &&
      timelineIsValid
    );
  }

  submitForm(): void {
    this.successMessage = '';
    this.submitError = '';

    if (!this.validateForm()) {
      this.changeDetectorRef.detectChanges();
      return;
    }

    this.isSubmitting = true;
    this.changeDetectorRef.detectChanges();

    this.scheduleVisitService.submitRequest({
      name: this.form.name.trim(),
      phone: this.form.phone.trim(),
      email: this.form.email.trim(),
      inquiryFor: this.form.inquiryFor,
      tourReadiness: this.form.tourReadiness,
      timeline: this.form.timeline,
      website: this.form.website
    }).subscribe({
      next: (response: ScheduleVisitResponse) => {
        this.logger.info('Schedule visit form submitted successfully');

        this.successMessage =
          response.message || 'Thank you. Your request has been received.';

        this.isSubmitting = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.logger.error('Schedule visit form request failed', {
          status: error.status,
          message: error.message
        });

        if (error.status === 429) {
          this.submitError = 'Too many attempts. Please wait a few minutes and try again.';
        } else if (error.error?.title) {
          this.submitError = error.error.title;
        } else {
          this.submitError = 'Sorry, unable to submit your message. Please call (507) 553-6271 instead.';
        }

        this.isSubmitting = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}