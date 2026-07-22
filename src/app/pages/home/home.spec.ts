import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the landing-page sections in the intended order', () => {
    const host = fixture.nativeElement as HTMLElement;
    const sectionHeadings = Array.from(host.querySelectorAll<HTMLElement>('.home-section h2')).map(
      (heading) => heading.textContent?.trim(),
    );

    expect(sectionHeadings).toEqual([
      'Why Families Choose Shepherds Inn',
      'Rooted in Wells. Centered on Community.',
      'Personalized Support for Everyday Living',
      'Peace of Mind Starts Here',
      'What Families Say',
    ]);
    expect(host.querySelector('app-page-cta')).toBeTruthy();
  });

  it('should render one approved featured testimonial without carousel controls', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelectorAll('.featured-testimonial')).toHaveLength(1);
    expect(host.querySelector('.featured-testimonial')?.textContent).toContain('Loving Family');
    expect(host.querySelector('.review-arrow')).toBeNull();
  });

  it('should connect the shared CTA to the existing form interactions', () => {
    const host = fixture.nativeElement as HTMLElement;
    const ctaButtons = host.querySelectorAll<HTMLButtonElement>('app-page-cta button');

    ctaButtons[0].click();
    ctaButtons[1].click();

    expect(component.showScheduleVisitForm).toBe(true);
    expect(component.showMessageForm).toBe(true);
  });
});
