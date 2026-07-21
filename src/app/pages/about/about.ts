import { Component } from '@angular/core';

import { MessageForm } from '../../components/message-form/message-form';
import { PageCta } from '../../components/page-cta/page-cta';
import { ScheduleVisitForm } from '../../components/schedule-visit-form/schedule-visit-form';
import { SITE_INFO } from '../../shared/site-info';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MessageForm, PageCta, ScheduleVisitForm],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly siteInfo = SITE_INFO;
  showMessageForm = false;
  showScheduleVisitForm = false;
}
