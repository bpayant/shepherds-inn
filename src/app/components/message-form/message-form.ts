import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SITE_INFO } from '../../shared/site-info';
import { ContactMessageService, ContactMessageResponse } from '../../services/contact-message';
import { ClientLogger } from '../../shared/logging/client-logger';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-form.html',
  styleUrl: './message-form.css'
})
export class MessageForm {
  @Input() formTitle = 'Send us a Message';
  @Input() defaultSubject = 'General Inquiry';
  @Input() submitButtonText = 'Send Message';

  @Output() close = new EventEmitter<void>();

  isSubmitting = false;
  successMessage = '';
  submitError = '';

  form = {
    name: '',
    phone: '',
    email: '',
    preferredContact: 'Call',
    message: '',
    website: ''
  };

  errors = {
    name: '',
    phone: '',
    email: '',
    contact: '',
    message: ''
  };

  constructor(
    private contactMessageService: ContactMessageService,
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

    if (digits.length !== 0 && digits.length !== 10) {
      this.errors.phone = 'Please enter as (###) ###-####, or blank w/ "Email" as preference';
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
      this.errors.email = 'Please enter as ***@***.***, or blank w/ "Call" as preference';
      return false;
    }

    return true;
  }

  validateMessage(): boolean {
    this.errors.message = '';

    const minimum = SITE_INFO.minMessageLength;

    if (this.form.message.trim().length < minimum) {
      this.errors.message = `Please enter a message which is at least ${minimum} characters`;
      return false;
    }

    return true;
  }

  validateContactMethodProvided(): boolean {
    this.errors.contact = '';
    this.errors.phone = '';
    this.errors.email = '';

    const phoneExists = this.form.phone.trim();
    const emailExists = this.form.email.trim();
    const phoneValid = this.validatePhone();
    const emailValid = this.validateEmail();

    if ((this.form.preferredContact === 'Call') && (!phoneExists)) {
      this.errors.phone = 'Please enter as (###) ###-####, or blank + "Email" as preference';
      return false;
    }
    if ((this.form.preferredContact === 'Email') && (!emailExists)) {
      this.errors.email = 'Please enter as ***@***.***, or blank w/ "Call" as preference';
      return false;
    }

    return phoneValid && emailValid;
  }

  validateForm(): boolean {
    const nameIsValid = this.validateName();
    const messageIsValid = this.validateMessage();
    const contactProvided = this.validateContactMethodProvided();

    return (
      nameIsValid &&
      messageIsValid &&
      contactProvided
    );
  }

  submitForm(): void {
    this.logger.debug('Contact form submit clicked');
    this.successMessage = '';
    this.submitError = '';

    if (!this.validateForm()) {
      this.logger.debug('Contact form validation failed');
      this.changeDetectorRef.detectChanges();
      return;
    }

    this.isSubmitting = true;
    this.changeDetectorRef.detectChanges();

    const request = {
      name: this.form.name.trim(),
      phone: this.form.phone.trim(),
      email: this.form.email.trim(),
      preferredContact: this.form.preferredContact,
      subject: this.defaultSubject,
      message: this.form.message.trim(),
      website: this.form.website
    };
    
    this.contactMessageService.sendMessage(request).subscribe({
      next: (response: ContactMessageResponse) => {

        this.successMessage = response.message || 'Your message has been received.';

        this.isSubmitting = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.logger.error('Contact form request failed', {
          status: error.status,
          message: error.message
        });
        if (error.status === 429) {
          this.submitError = 'Too many attempts. Please wait a few minutes and try again.';
        } else if (error.error?.title) {
          this.submitError = error.error.title;
        } else {
          this.submitError = `Sorry, unable to submit your message. Please call ${SITE_INFO.phone} instead.`;
        }

        this.isSubmitting = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}