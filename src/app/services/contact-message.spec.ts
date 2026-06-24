import { TestBed } from '@angular/core/testing';

import { ContactMessage } from './contact-message';

describe('ContactMessage', () => {
  let service: ContactMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactMessage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
