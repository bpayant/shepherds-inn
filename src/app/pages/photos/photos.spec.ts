import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photos } from './photos';

describe('Photos', () => {
  let component: Photos;
  let fixture: ComponentFixture<Photos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Photos],
    }).compileComponents();

    fixture = TestBed.createComponent(Photos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the selected thumbnail through aria-pressed', () => {
    const host = fixture.nativeElement as HTMLElement;
    const thumbnails = Array.from(host.querySelectorAll<HTMLButtonElement>('.thumbnail-button'));

    expect(thumbnails.length).toBeGreaterThan(1);
    expect(thumbnails[0].getAttribute('aria-pressed')).toBe('true');
    expect(
      thumbnails.slice(1).every((thumbnail) => thumbnail.getAttribute('aria-pressed') === 'false'),
    ).toBe(true);
  });

  it('should disable unavailable month navigation', () => {
    const host = fixture.nativeElement as HTMLElement;
    const monthButtons = host.querySelectorAll<HTMLButtonElement>('.month-link');

    expect(monthButtons[0].disabled).toBe(true);
    expect(monthButtons[1].disabled).toBe(false);
  });
});
