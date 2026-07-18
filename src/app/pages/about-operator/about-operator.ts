import { Component } from '@angular/core';

import { MessageForm } from '../../components/message-form/message-form';

@Component({
  selector: 'app-about-operator',
  standalone: true,
  imports: [MessageForm],
  templateUrl: './about-operator.html',
  styleUrl: './about-operator.css',
})
export class AboutOperator {
  showMessageForm = false;
}
