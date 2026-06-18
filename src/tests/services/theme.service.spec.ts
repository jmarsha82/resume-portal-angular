import { TestBed } from '@angular/core/testing';

import { ThemeService } from '../../app/services/theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
  });

  afterEach(() => TestBed.resetTestingModule());

  it('defaults to dark and applies the document attribute', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.mode()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });

  it('restores a persisted light preference', () => {
    localStorage.setItem('resume-portal-theme', 'light');

    const service = TestBed.inject(ThemeService);

    expect(service.mode()).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('ignores invalid persisted values', () => {
    localStorage.setItem('resume-portal-theme', 'blue');

    expect(TestBed.inject(ThemeService).mode()).toBe('dark');
  });

  it('persists explicit changes and toggles both directions', () => {
    const service = TestBed.inject(ThemeService);

    service.setMode('light');
    expect(localStorage.getItem('resume-portal-theme')).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');

    service.toggle();
    expect(service.mode()).toBe('dark');
    expect(localStorage.getItem('resume-portal-theme')).toBe('dark');
  });
});
