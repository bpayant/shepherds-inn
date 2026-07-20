import { Component } from '@angular/core';

import { MessageForm } from '../../components/message-form/message-form';
import { PageCta } from '../../components/page-cta/page-cta';
import { ScheduleVisitForm } from '../../components/schedule-visit-form/schedule-visit-form';
import { SITE_INFO } from '../../shared/site-info';

@Component({
  selector: 'app-about-operator',
  standalone: true,
  imports: [MessageForm, PageCta, ScheduleVisitForm],
  templateUrl: './about-operator.html',
  styleUrl: './about-operator.css',
})
export class AboutOperator {
  readonly siteInfo = SITE_INFO;
  showMessageForm = false;
  showScheduleVisitForm = false;
}
