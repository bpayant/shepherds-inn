import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageForm } from './message-form';

describe('MessageForm', () => {
  let component: MessageForm;
  let fixture: ComponentFixture<MessageForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
