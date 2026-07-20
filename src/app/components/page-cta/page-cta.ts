import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-cta',
  standalone: true,
  templateUrl: './page-cta.html',
  styleUrl: './page-cta.css',
})
export class PageCta {
  private static nextId = 0;

  readonly titleId = `page-cta-title-${PageCta.nextId++}`;

  @Input({ required: true }) title = '';
  @Input({ required: true }) text = '';
  @Input({ required: true }) primaryButtonText = '';
  @Input() secondaryButtonText?: string;

  @Output() primaryAction = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();
}
