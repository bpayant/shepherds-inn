import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SITE_INFO } from '../../shared/site-info';
import { MessageForm } from '../../components/message-form/message-form';

@Component({
  selector: 'app-contact',
  imports: [MessageForm],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  siteInfo = SITE_INFO;
  googleMapsEmbedUrl: SafeResourceUrl;
  showMessageForm = false;

  constructor(private sanitizer: DomSanitizer) {
    this.googleMapsEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      SITE_INFO.googleMapsEmbedUrl
    );
  }
}
