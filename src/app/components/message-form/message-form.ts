import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SITE_INFO } from '../../shared/site-info';

@Component({
  selector: 'app-message-form',
  imports: [FormsModule],
  templateUrl: './message-form.html',
  styleUrl: './message-form.css'
})
export class MessageForm {
  @Input() formTitle = 'Send Us a Message';
  @Input() defaultSubject = 'General Inquiry';
  @Input() submitButtonText = 'Send Message';

  @Output() close = new EventEmitter<void>();

  form = {
    name: '',
    phone: '',
    email: '',
    preferredContact: 'Call',
    message: ''
  };

  // errors = {
  //   name: '',
  //   contact: '',
  //   message: ''
  // };

  // private validateForm(): boolean {
  //   this.errors = {
  //     name: '',
  //     contact: '',
  //     message: ''
  //   };

  //   let isValid = true;

  //   if (!this.form.name.trim()) {
  //     this.errors.name = 'Please enter your name.';
  //     isValid = false;
  //   }

  //   if (!this.form.phone.trim() && !this.form.email.trim()) {
  //     this.errors.contact = 'Please enter a phone number or email address.';
  //     isValid = false;
  //   }

  //   if (!this.form.message.trim()) {
  //     this.errors.message = 'Please enter a message.';
  //     isValid = false;
  //   }

  //   return isValid;
  // }

  closeForm(): void {
    this.close.emit();
  }

  // submitForm(): void {
  //   if (!this.validateForm()) {
  //     return;
  //   }

  //   console.log('Message form submitted:', {
  //     subject: this.defaultSubject,
  //     ...this.form
  //   });

  //   alert('Thank you! Your message has been submitted.');

  //   this.closeForm();
  // }

  formatPhoneNumber(): void {
    // debugger;

    const digits = this.form.phone.replace(/\D/g, '');

    console.log('Phone number digits:', digits);

    if (!digits) {
      return;
    }

    let normalized = digits;

    if ((normalized.length === 11) && normalized[0] === '1') {
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

  // VALIDATION

  errors = {
    name: '',
    phone: '',
    email: '',
    contact: '',
    message: ''
  };

  validateName(): boolean {
    this.errors.name = '';

    if (!this.form.name.trim()) {
      this.errors.name = 'Name is required';
      return false;
    }

    return true;
  }

  validatePhone(): boolean {
    this.errors.phone = '';

    const digits = this.form.phone.replace(/\D/g, '');

    if (digits.length !== 0 && digits.length !== 10) {
      this.errors.phone = '10-digits (or blank) required: (###) ###-####';
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
      this.errors.email = 'Valid email (or blank) required: ***@***.com';
      return false;
    }

    return true;
  }

  validateMessage(): boolean {
    this.errors.message = '';

    const minimum = SITE_INFO.minMessageLength;

    if (this.form.message.trim().length < minimum) {
      this.errors.message = `Message must be at least ${minimum} characters`;
      return false;
    }

    return true;
  }

  validateContactMethodProvided(): boolean {
    this.errors.contact = '';

    if (!this.form.phone.trim() && !this.form.email.trim()) {
      this.errors.contact = 'Please enter a phone number or email address';
      return false;
    }

    return true;
  }

  validateForm(): boolean {
    const nameIsValid = this.validateName();
    const phoneIsValid = this.validatePhone();
    const emailIsValid = this.validateEmail();
    const messageIsValid = this.validateMessage();
    const contactProvided = this.validateContactMethodProvided();

    return (
      nameIsValid &&
      phoneIsValid &&
      emailIsValid &&
      messageIsValid &&
      contactProvided
    );
  }

  submitForm(): void {
    if (!this.validateForm()) {
      return;
    }

    console.log('Message form submitted:', {
      subject: this.defaultSubject,
      ...this.form
    });

    alert('Thank you! Your message has been submitted');

    this.closeForm();
  }
}