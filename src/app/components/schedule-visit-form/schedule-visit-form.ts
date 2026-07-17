import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SITE_INFO } from '../../shared/site-info';
import { ScheduleVisitResponse, ScheduleVisitService } from '../../services/schedule-visit';
import { ClientLogger } from '../../shared/logging/client-logger';

export const MAX_PREFERRED_VISIT_DATES = 5;
export const SCHEDULE_VISIT_SUCCESS_MESSAGE =
  'Thank you! Someone from Shepherds Inn will contact you shortly to confirm a tour date and time.';

interface CalendarDay {
  dateValue: string;
  dayNumber: number;
  isPast: boolean;
}

@Component({
  selector: 'app-schedule-visit-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './schedule-visit-form.html',
  styleUrl: './schedule-visit-form.css',
})
export class ScheduleVisitForm implements AfterViewInit {
  @ViewChild('dialog') private dialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('initialFocus') private initialFocus?: ElementRef<HTMLInputElement>;
  @ViewChildren('calendarDayButton')
  private calendarDayButtons?: QueryList<ElementRef<HTMLButtonElement>>;

  @Output() close = new EventEmitter<void>();

  isSubmitting = false;
  successMessage = '';
  submitError = '';

  form = {
    name: '',
    phone: '',
    email: '',
    inquiryFor: 'Myself',
    timeline: 'Immediately',
    website: '',
  };

  readonly maxPreferredDates = MAX_PREFERRED_VISIT_DATES;
  readonly minimumPreferredDate = this.toLocalDateValue(new Date());
  readonly weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  preferredDates: string[] = [];
  calendarAnnouncement = '';
  displayedMonth = this.startOfMonth(this.fromDateValue(this.minimumPreferredDate));
  focusedCalendarDate = this.minimumPreferredDate;

  errors = {
    name: '',
    phone: '',
    email: '',
    inquiryFor: '',
    timeline: '',
    preferredDates: '',
  };

  private previouslyFocusedElement: HTMLElement | null = null;
  private closeEmitted = false;

  constructor(
    private scheduleVisitService: ScheduleVisitService,
    private changeDetectorRef: ChangeDetectorRef,
    private logger: ClientLogger,
  ) {}

  ngAfterViewInit(): void {
    const dialog = this.dialog?.nativeElement;

    if (!dialog) {
      return;
    }

    this.previouslyFocusedElement = dialog.ownerDocument.activeElement as HTMLElement | null;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    }

    this.initialFocus?.nativeElement.focus();
  }

  closeForm(): void {
    const dialog = this.dialog?.nativeElement;

    if (dialog?.open && typeof dialog.close === 'function') {
      dialog.close();
      return;
    }

    this.finishClose();
  }

  onDialogClosed(): void {
    this.finishClose();
  }

  private finishClose(): void {
    if (this.closeEmitted) {
      return;
    }

    this.closeEmitted = true;
    this.close.emit();

    queueMicrotask(() => {
      if (this.previouslyFocusedElement?.isConnected) {
        this.previouslyFocusedElement.focus();
      }
    });
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
      `(${normalized.slice(0, 3)}) ` + `${normalized.slice(3, 6)}-` + `${normalized.slice(6, 10)}`;
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

  validateTimeline(): boolean {
    this.errors.timeline = '';

    if (!this.form.timeline) {
      this.errors.timeline = 'Please select a timeline';
      return false;
    }

    return true;
  }

  get displayedMonthLabel(): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(this.displayedMonth);
  }

  get calendarDays(): (CalendarDay | null)[] {
    const year = this.displayedMonth.getFullYear();
    const month = this.displayedMonth.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (CalendarDay | null)[] = Array(firstWeekday).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateValue = this.toLocalDateValue(new Date(year, month, day));
      days.push({
        dateValue,
        dayNumber: day,
        isPast: dateValue < this.minimumPreferredDate,
      });
    }

    return days;
  }

  get canShowPreviousMonth(): boolean {
    return this.displayedMonth > this.startOfMonth(this.fromDateValue(this.minimumPreferredDate));
  }

  togglePreferredDate(date: string): void {
    this.errors.preferredDates = '';

    if (date < this.minimumPreferredDate) {
      this.errors.preferredDates = 'Preferred visit dates cannot be in the past';
      return;
    }

    if (this.preferredDates.includes(date)) {
      this.removePreferredDate(date, false);
      return;
    }

    if (this.preferredDates.length >= MAX_PREFERRED_VISIT_DATES) {
      this.errors.preferredDates = `You may select up to ${MAX_PREFERRED_VISIT_DATES} preferred visit dates`;
      this.calendarAnnouncement = this.errors.preferredDates;
      return;
    }

    this.preferredDates = [...this.preferredDates, date].sort();
    this.calendarAnnouncement =
      `${this.formatPreferredDate(date)} selected. ` +
      `${this.preferredDates.length} of ${MAX_PREFERRED_VISIT_DATES} dates selected.`;
  }

  removePreferredDate(date: string, restoreChipFocus = true): void {
    const removedIndex = this.preferredDates.indexOf(date);

    this.preferredDates = this.preferredDates.filter((preferredDate) => preferredDate !== date);
    this.errors.preferredDates = '';
    this.calendarAnnouncement =
      `${this.formatPreferredDate(date)} removed. ` +
      `${this.preferredDates.length} of ${MAX_PREFERRED_VISIT_DATES} dates selected.`;

    if (restoreChipFocus) {
      queueMicrotask(() => this.restoreFocusAfterChipRemoval(removedIndex));
    }
  }

  isDateSelected(date: string): boolean {
    return this.preferredDates.includes(date);
  }

  isDateDisabled(day: CalendarDay): boolean {
    return day.isPast;
  }

  isDateUnavailableAtLimit(day: CalendarDay): boolean {
    return (
      this.preferredDates.length >= MAX_PREFERRED_VISIT_DATES && !this.isDateSelected(day.dateValue)
    );
  }

  showPreviousMonth(): void {
    if (this.canShowPreviousMonth) {
      this.changeDisplayedMonth(-1);
    }
  }

  showNextMonth(): void {
    this.changeDisplayedMonth(1);
  }

  onCalendarDayKeydown(event: KeyboardEvent, dateValue: string): void {
    let targetDate: Date | null = null;
    const currentDate = this.fromDateValue(dateValue);

    switch (event.key) {
      case 'ArrowLeft':
        targetDate = this.addDays(currentDate, -1);
        break;
      case 'ArrowRight':
        targetDate = this.addDays(currentDate, 1);
        break;
      case 'ArrowUp':
        targetDate = this.addDays(currentDate, -7);
        break;
      case 'ArrowDown':
        targetDate = this.addDays(currentDate, 7);
        break;
      case 'Home':
        targetDate = this.addDays(currentDate, -currentDate.getDay());
        break;
      case 'End':
        targetDate = this.addDays(currentDate, 6 - currentDate.getDay());
        break;
      case 'PageUp':
        targetDate = this.addMonths(currentDate, -1);
        break;
      case 'PageDown':
        targetDate = this.addMonths(currentDate, 1);
        break;
      default:
        return;
    }

    event.preventDefault();

    if (this.toLocalDateValue(targetDate) < this.minimumPreferredDate) {
      targetDate = this.fromDateValue(this.minimumPreferredDate);
    }

    this.focusCalendarDate(this.toLocalDateValue(targetDate));
  }

  validatePreferredDates(): boolean {
    this.errors.preferredDates = '';

    if (this.preferredDates.length === 0) {
      this.errors.preferredDates = 'Please add at least one preferred visit date';
      return false;
    }

    if (this.preferredDates.length > MAX_PREFERRED_VISIT_DATES) {
      this.errors.preferredDates = `You may select up to ${MAX_PREFERRED_VISIT_DATES} preferred visit dates`;
      return false;
    }

    if (new Set(this.preferredDates).size !== this.preferredDates.length) {
      this.errors.preferredDates = 'Preferred visit dates cannot contain duplicates';
      return false;
    }

    if (this.preferredDates.some((date) => date < this.minimumPreferredDate)) {
      this.errors.preferredDates = 'Preferred visit dates cannot be in the past';
      return false;
    }

    return true;
  }

  formatPreferredDate(date: string): string {
    const [year, month, day] = date.split('-').map(Number);

    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(year, month - 1, day));
  }

  validateForm(): boolean {
    const nameIsValid = this.validateName();
    const phoneIsValid = this.validatePhone();
    const emailIsValid = this.validateEmail();
    const inquiryForIsValid = this.validateInquiryFor();
    const timelineIsValid = this.validateTimeline();
    const preferredDatesAreValid = this.validatePreferredDates();

    return (
      nameIsValid &&
      phoneIsValid &&
      emailIsValid &&
      inquiryForIsValid &&
      timelineIsValid &&
      preferredDatesAreValid
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

    this.scheduleVisitService
      .submitRequest({
        name: this.form.name.trim(),
        phone: this.form.phone.trim(),
        email: this.form.email.trim(),
        inquiryFor: this.form.inquiryFor,
        timeline: this.form.timeline,
        preferredDates: [...this.preferredDates],
        website: this.form.website,
      })
      .subscribe({
        next: (_response: ScheduleVisitResponse) => {
          this.logger.info('Schedule visit form submitted successfully');

          this.successMessage = SCHEDULE_VISIT_SUCCESS_MESSAGE;

          this.isSubmitting = false;
          this.changeDetectorRef.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          this.logger.error('Schedule visit form request failed', {
            status: error.status,
            message: error.message,
          });

          if (error.status === 429) {
            this.submitError = 'Too many attempts. Please wait a few minutes and try again.';
          } else if (error.error?.errors?.PreferredDates?.[0]) {
            this.errors.preferredDates = error.error.errors.PreferredDates[0];
            this.submitError = error.error.title || 'Please check the form and try again.';
          } else if (error.error?.title) {
            this.submitError = error.error.title;
          } else {
            this.submitError = `Sorry, unable to submit your message. Please call ${SITE_INFO.phone} instead.`;
          }

          this.isSubmitting = false;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  private toLocalDateValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private fromDateValue(dateValue: string): Date {
    const [year, month, day] = dateValue.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private addDays(date: Date, days: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  }

  private addMonths(date: Date, months: number): Date {
    const targetMonth = new Date(date.getFullYear(), date.getMonth() + months, 1);
    const targetDay = Math.min(
      date.getDate(),
      new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate(),
    );

    return new Date(targetMonth.getFullYear(), targetMonth.getMonth(), targetDay);
  }

  private changeDisplayedMonth(offset: number): void {
    this.displayedMonth = new Date(
      this.displayedMonth.getFullYear(),
      this.displayedMonth.getMonth() + offset,
      1,
    );

    const firstDateInMonth = this.toLocalDateValue(this.displayedMonth);
    this.focusedCalendarDate =
      firstDateInMonth < this.minimumPreferredDate ? this.minimumPreferredDate : firstDateInMonth;
  }

  private focusCalendarDate(dateValue: string): void {
    this.focusedCalendarDate = dateValue;
    this.displayedMonth = this.startOfMonth(this.fromDateValue(dateValue));
    this.changeDetectorRef.detectChanges();

    queueMicrotask(() => {
      const button = this.calendarDayButtons?.find(
        (item) => item.nativeElement.dataset['date'] === dateValue,
      );
      button?.nativeElement.focus();
    });
  }

  private restoreFocusAfterChipRemoval(removedIndex: number): void {
    const chipButtons =
      this.dialog?.nativeElement.querySelectorAll<HTMLButtonElement>('.date-chip-remove');

    if (chipButtons?.length) {
      chipButtons[Math.min(removedIndex, chipButtons.length - 1)].focus();
      return;
    }

    this.focusCalendarDate(this.focusedCalendarDate);
  }
}
