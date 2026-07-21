import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { About } from './about';
import { routes } from '../../app.routes';
import { ClientLogger, SilentClientLogger } from '../../shared/logging/client-logger';
import { SITE_INFO } from '../../shared/site-info';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [provideHttpClient(), { provide: ClientLogger, useClass: SilentClientLogger }],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be the canonical About page and preserve the former route as a redirect', () => {
    const aboutRoute = routes.find((route) => route.path === 'about');
    const legacyRoute = routes.find((route) => route.path === 'about-operator');

    expect(aboutRoute?.component).toBe(About);
    expect(legacyRoute?.redirectTo).toBe('about');
    expect(legacyRoute?.pathMatch).toBe('full');
  });

  it('should display the approved sections', () => {
    const pageText = fixture.nativeElement.textContent;

    expect(pageText).toContain('Local Leadership. Personal Accountability.');
    expect(pageText).toContain('More Than Three Decades of Caring for Wells Families');
    expect(pageText).toContain('Meet Our Executive Director, Heather Tilghman');
    expect(pageText).toContain('Supported by Next Level Senior Living');
    expect(pageText).toContain('The Next Level Difference');
  });

  it('should provide the same opening contact action as the Services page', async () => {
    const contactButton = fixture.nativeElement.querySelector(
      '.opening-top-button',
    ) as HTMLButtonElement;

    expect(contactButton.textContent.trim()).toBe('Get in Touch');
    expect(contactButton.classList.contains('page-top-button')).toBe(true);

    contactButton.click();
    await fixture.whenStable();

    expect(component.showMessageForm).toBe(true);
    expect(fixture.nativeElement.querySelector('app-message-form')).toBeTruthy();
  });

  it('should use the exterior photo in the opening', () => {
    const exteriorPhoto = fixture.nativeElement.querySelector(
      '.opening-photo img',
    ) as HTMLImageElement;

    expect(exteriorPhoto.getAttribute('src')).toBe('/images/about/shepherds-inn-front.png');
    expect(exteriorPhoto.getAttribute('alt')).toBe(
      'Main entrance of Shepherds Inn Assisted Living in Wells, Minnesota',
    );
  });

  it('should use the community activity photo in the history section', () => {
    const activityPhoto = fixture.nativeElement.querySelector(
      '.history-layout .community-photo img',
    ) as HTMLImageElement;

    expect(activityPhoto.getAttribute('src')).toBe('/images/about/cards-with-residents-crop1.jpg');
    expect(activityPhoto.getAttribute('alt')).toBe(
      'Shepherds Inn residents and local young people playing cards together',
    );
  });

  it('should link the complete Next Level logo card to the shared external URL', () => {
    const logoLink = fixture.nativeElement.querySelector(
      'a.next-level-logo-card',
    ) as HTMLAnchorElement;
    const logo = logoLink.querySelector('img') as HTMLImageElement;

    expect(logoLink.getAttribute('href')).toBe(SITE_INFO.nextLevelUrl);
    expect(logoLink.getAttribute('target')).toBe('_blank');
    expect(logoLink.getAttribute('rel')).toBe('noopener');
    expect(logoLink.getAttribute('aria-label')).toContain('opens in a new tab');
    expect(logo.getAttribute('alt')).toBe('Next Level Senior Living');
    expect(['none', '']).toContain(getComputedStyle(logo).transform);
  });

  it('should retain all four Next Level principle cards', () => {
    const principleCollection = fixture.nativeElement.querySelector(
      '.principle-grid',
    ) as HTMLElement;
    const principleCards = principleCollection.querySelectorAll('.principle-card');
    const principleHeadings = Array.from(principleCards, (card) =>
      (card as HTMLElement).querySelector('h4')?.textContent?.trim(),
    );

    expect(principleCards).toHaveLength(4);
    expect(principleHeadings).toEqual([
      '❤️ Residents Come First',
      '🤝 Relationships Matter',
      '🏠 Local Leadership Wins',
      '📈 Strong Systems Support Great Care',
    ]);

    const goalPanel = fixture.nativeElement.querySelector('.difference-closing') as HTMLElement;

    expect(goalPanel.querySelector('h4')?.textContent?.trim()).toBe(
      'The Next Level goal is simple:',
    );
    expect(goalPanel.querySelector('p')?.textContent).toContain(
      'Preserve everything that makes Shepherds Inn special',
    );
  });

  it('should render the revised single-action CTA and open the schedule form', async () => {
    const cta = fixture.nativeElement.querySelector('app-page-cta') as HTMLElement;
    const buttons = cta.querySelectorAll('button');

    expect(cta.querySelector('h2')?.textContent).toContain(
      'Come Experience the Shepherds Inn Difference for Yourself',
    );
    expect(buttons).toHaveLength(1);
    expect(buttons[0].textContent).toContain('Schedule a Visit');
    expect(cta.textContent).not.toContain('Get in Touch');

    buttons[0].click();
    await fixture.whenStable();

    expect(component.showScheduleVisitForm).toBe(true);
    expect(fixture.nativeElement.querySelector('app-schedule-visit-form')).toBeTruthy();
  });

  it('should render finalized director content without development placeholders', () => {
    const directorSection = fixture.nativeElement.querySelector('.director-layout') as HTMLElement;
    const directorPhoto = directorSection.querySelector('.director-photo img') as HTMLImageElement;

    expect(directorSection.textContent).toContain('Meet Our Executive Director, Heather Tilghman');
    expect(directorPhoto.getAttribute('src')).toBe('/images/about/heather.jpg');
    expect(directorPhoto.getAttribute('alt')).toBe(
      'Heather Tilghman, Executive Director of Shepherds Inn',
    );
    expect(directorSection.querySelector('.director-quote')).toBeNull();
    expect(directorSection.textContent).not.toContain('XX years');
    expect(directorSection.textContent).not.toContain('Operator input needed:');
    expect(directorSection.textContent).not.toContain('Outside of work');
    expect(directorSection.querySelector('.director-photo-placeholder')).toBeNull();
    expect(directorSection.querySelector('.content-placeholder')).toBeNull();
  });
});
