import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookLink } from './facebook-link';

describe('FacebookLink', () => {
  let component: FacebookLink;
  let fixture: ComponentFixture<FacebookLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookLink],
    }).compileComponents();

    fixture = TestBed.createComponent(FacebookLink);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
