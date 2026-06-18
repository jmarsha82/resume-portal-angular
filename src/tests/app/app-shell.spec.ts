import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppComponent } from '../../app/app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => TestBed.resetTestingModule());

  it('renders all primary navigation links and saved-theme messaging', async () => {
    const fixture = await createApp();
    const root = fixture.nativeElement as HTMLElement;
    const labels = Array.from(root.querySelectorAll('nav a')).map((link) => link.textContent?.trim());

    expect(labels).toEqual(['Home', 'Programmer', 'Artist', 'Games', 'About']);
    expect(root.querySelector('.theme-save-note')?.textContent).toContain('saved across the app');
  });

  it('opens the mobile menu and toggles the persisted theme', async () => {
    const fixture = await createApp();
    const root = fixture.nativeElement as HTMLElement;
    const menu = root.querySelector('.menu-toggle') as HTMLButtonElement;
    const theme = root.querySelector('.theme-toggle') as HTMLButtonElement;

    menu.click();
    fixture.detectChanges();
    expect(menu.getAttribute('aria-expanded')).toBe('true');
    expect(root.querySelector('nav')?.classList).toContain('menu-open');

    theme.click();
    fixture.detectChanges();
    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem('resume-portal-theme')).toBe('light');
  });
});

async function createApp() {
  await TestBed.configureTestingModule({
    imports: [AppComponent],
    providers: [provideRouter([])]
  }).compileComponents();
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  return fixture;
}
