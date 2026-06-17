import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
  });

  it('defaults to dark and applies the document attribute', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.mode()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });

  it('persists theme changes', () => {
    const service = TestBed.inject(ThemeService);

    service.toggle();

    expect(service.mode()).toBe('light');
    expect(localStorage.getItem('resume-portal-theme')).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });
});
