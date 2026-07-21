import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the transparent reverse logo on the dark footer', () => {
    const logo = fixture.nativeElement.querySelector('.footer-brand-logo') as HTMLImageElement;

    expect(logo.getAttribute('src')).toBe('/images/shepherds-inn-logo-reverse.svg');
    expect(logo.getAttribute('alt')).toBe('Shepherds Inn Assisted Living');
  });
});
