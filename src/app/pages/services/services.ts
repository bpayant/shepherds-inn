import { Component } from '@angular/core';

import { MessageForm } from '../../components/message-form/message-form';
import { ScheduleVisitForm } from '../../components/schedule-visit-form/schedule-visit-form';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MessageForm, ScheduleVisitForm],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services {
  showMessageForm = false;
  showScheduleVisitForm = false;
}