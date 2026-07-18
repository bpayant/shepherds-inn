import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { AboutOperator } from './about-operator';
import { routes } from '../../app.routes';
import { ClientLogger, SilentClientLogger } from '../../shared/logging/client-logger';

describe('AboutOperator', () => {
  let component: AboutOperator;
  let fixture: ComponentFixture<AboutOperator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutOperator],
      providers: [provideHttpClient(), { provide: ClientLogger, useClass: SilentClientLogger }],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutOperator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be registered at the temporary comparison route', () => {
    const operatorRoute = routes.find((route) => route.path === 'about-operator');

    expect(operatorRoute?.component).toBe(AboutOperator);
  });

  it('should display the operator-proposed sections', () => {
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

    expect(activityPhoto.getAttribute('src')).toBe('/images/about/cards-with-residents.jpg');
    expect(activityPhoto.getAttribute('alt')).toBe(
      'Shepherds Inn residents and local young people playing cards together',
    );
  });

  it('should visibly retain the unconfirmed operator content', () => {
    const pageText = fixture.nativeElement.textContent;
    const photoPlaceholder = fixture.nativeElement.querySelector('.director-photo-placeholder');

    expect(pageText).toContain('XX years');
    expect(pageText).toContain('Operator input needed:');
    expect(pageText).toContain('Outside of work');
    expect(photoPlaceholder.getAttribute('role')).toBe('img');
    expect(photoPlaceholder.getAttribute('aria-label')).toContain('Temporary placeholder');
  });
});
