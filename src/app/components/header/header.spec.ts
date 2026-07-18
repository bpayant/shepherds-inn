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

  it('should show the About comparison links in the required order', () => {
    const header = fixture.nativeElement as HTMLElement;
    const links = Array.from(header.querySelectorAll<HTMLAnchorElement>('.main-nav a'));
    const aboutLinkIndex = links.findIndex((link) => link.textContent?.trim() === 'About');
    const aboutDraftLink = links[aboutLinkIndex + 1];

    expect(links[aboutLinkIndex].getAttribute('href')).toBe('/about');
    expect(aboutDraftLink.textContent?.trim()).toBe('About Draft');
    expect(aboutDraftLink.getAttribute('href')).toBe('/about-operator');
  });
});
