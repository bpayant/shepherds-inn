import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SITE_INFO } from '../../shared/site-info';
import { MessageForm } from '../../components/message-form/message-form';
import { ScheduleVisitForm } from '../../components/schedule-visit-form/schedule-visit-form';

@Component({
  selector: 'app-contact',
  imports: [MessageForm, ScheduleVisitForm],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  siteInfo = SITE_INFO;
  googleMapsEmbedUrl: SafeResourceUrl;
  showMessageForm = false;
  showScheduleVisitForm = false;

  constructor(private sanitizer: DomSanitizer) {
    this.googleMapsEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      SITE_INFO.googleMapsEmbedUrl
    );
  }
}
