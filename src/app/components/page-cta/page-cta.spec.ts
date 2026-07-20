import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCta } from './page-cta';

describe('PageCta', () => {
  let component: PageCta;
  let fixture: ComponentFixture<PageCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCta],
    }).compileComponents();

    fixture = TestBed.createComponent(PageCta);
    component = fixture.componentInstance;
    component.title = 'Visit Shepherds Inn';
    component.text = 'Meet our team and explore the community.';
    component.primaryButtonText = 'Schedule a Visit';
    fixture.detectChanges();
  });

  it('should render the supplied title and supporting text', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h2')?.textContent).toContain('Visit Shepherds Inn');
    expect(element.querySelector('p')?.textContent).toContain(
      'Meet our team and explore the community.',
    );
  });

  it('should emit the primary action', () => {
    let emitted = false;
    component.primaryAction.subscribe(() => (emitted = true));

    (fixture.nativeElement.querySelector('.cta-light-button') as HTMLButtonElement).click();

    expect(emitted).toBe(true);
  });

  it('should not render a secondary button without a label', () => {
    expect(fixture.nativeElement.querySelector('.cta-secondary-button')).toBeNull();
  });

  it('should render and emit the secondary action when supplied', async () => {
    let emitted = false;
    component.secondaryAction.subscribe(() => (emitted = true));
    fixture.componentRef.setInput('secondaryButtonText', 'Get in Touch');
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector(
      '.cta-secondary-button',
    ) as HTMLButtonElement;
    button.click();

    expect(button.textContent).toContain('Get in Touch');
    expect(emitted).toBe(true);
  });
});
