import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageForm } from '../../components/message-form/message-form';
import { ScheduleVisitForm } from '../../components/schedule-visit-form/schedule-visit-form';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MessageForm, ScheduleVisitForm],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  showMessageForm = false;
  showScheduleVisitForm = false;
}