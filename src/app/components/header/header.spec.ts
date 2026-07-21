import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the transparent reverse logo on the dark header', () => {
    const logo = fixture.nativeElement.querySelector('.logo') as HTMLImageElement;

    expect(logo.getAttribute('src')).toBe('/images/shepherds-inn-logo-reverse.svg');
    expect(logo.getAttribute('alt')).toBe('Shepherds Inn Assisted Living');
  });

  it('should link the About navigation item to the canonical route', () => {
    const header = fixture.nativeElement as HTMLElement;
    const links = Array.from(header.querySelectorAll<HTMLAnchorElement>('.main-nav a'));
    const aboutLinks = links.filter((link) => link.textContent?.trim() === 'About');

    expect(aboutLinks).toHaveLength(1);
    expect(aboutLinks[0].getAttribute('href')).toBe('/about');
  });
});
