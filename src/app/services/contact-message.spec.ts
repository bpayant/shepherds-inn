import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ContactMessageService } from './contact-message';

describe('ContactMessageService', () => {
  let service: ContactMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ContactMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
