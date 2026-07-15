import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageForm } from './message-form';
import {
  ClientLogger,
  SilentClientLogger
} from '../../shared/logging/client-logger';

describe('MessageForm', () => {
  let component: MessageForm;
  let fixture: ComponentFixture<MessageForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageForm],
      providers: [
        provideHttpClient(),
        { provide: ClientLogger, useClass: SilentClientLogger }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
