import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Services } from './services';

describe('Services', () => {
  let component: Services;
  let fixture: ComponentFixture<Services>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services],
    }).compileComponents();

    fixture = TestBed.createComponent(Services);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should group the four peer service sections separately from the CTA', () => {
    const group = fixture.nativeElement.querySelector('.services-group') as HTMLElement;
    const sections = group.querySelectorAll(':scope .service-section');
    const headings = Array.from(sections, (section) =>
      section.querySelector('h2')?.textContent?.trim(),
    );

    expect(sections).toHaveLength(4);
    expect(headings).toEqual([
      'Comfort That Feels Like Home',
      'Personalized Care That Adapts With You',
      'Purpose Through Life Enrichment',
      'A Close-Knit Community',
    ]);
    expect(group.querySelector('.page-cta-card')).toBeNull();
  });
});
