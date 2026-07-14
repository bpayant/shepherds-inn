import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MessageForm } from '../../components/message-form/message-form';
import { ScheduleVisitForm } from '../../components/schedule-visit-form/schedule-visit-form';

@Component({
  selector: 'app-about',
  imports: [RouterLink, MessageForm, ScheduleVisitForm],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  showMessageForm = false;
  showScheduleVisitForm = false;
}
