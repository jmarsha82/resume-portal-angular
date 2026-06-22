import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ArtistPageComponent } from '../../app/pages/artist-page.component';
import { GamesPageComponent } from '../../app/pages/games-page.component';
import { HomePageComponent } from '../../app/pages/home-page.component';
import { MlPackPageComponent } from '../../app/pages/ml-pack-page.component';
import { ProgrammerPageComponent } from '../../app/pages/programmer-page.component';

describe('Portfolio pages', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('renders the home profile, navigation targets, artwork preview, and three specialties', async () => {
    const fixture = await create(HomePageComponent);
    const root = fixture.nativeElement as HTMLElement;
    const text = root.textContent ?? '';

    expect(text).toContain('Software Engineer');
    expect(text).toContain('Saint Louis, MO Area');
    expect(text).toContain('Oil Paintings');
    expect(text).not.toContain('Web Development');
    expect(root.querySelectorAll('.what-i-do a').length).toBe(3);
    expect(root.querySelectorAll('.featured-art img').length).toBe(5);
    expect(root.querySelector('.featured-art')?.getAttribute('href')).toBe('/artist');
    expect(root.querySelectorAll('.social-row svg').length).toBe(3);
  });

  it('renders programmer profile sections and safe external links', async () => {
    const fixture = await create(ProgrammerPageComponent);
    const root = fixture.nativeElement as HTMLElement;
    const text = root.textContent ?? '';

    expect(text).toContain('Programmer at Boeing');
    expect(text).toContain('Current Project(s) Tech Stack');
    expect(text).toContain('Experience');
    expect(text).toContain('Education');
    expect(text).toContain('Dev Books');
    expect(text).toContain('Dev Links');
    expect(Array.from(root.querySelectorAll('a[target="_blank"]')).every((link) => link.getAttribute('rel') === 'noopener noreferrer')).toBeTrue();
  });

  it('renders every artwork with an image, title, and details', async () => {
    const fixture = await create(ArtistPageComponent);
    const cards = Array.from(fixture.nativeElement.querySelectorAll('.artwork-card')) as HTMLElement[];

    expect(cards.length).toBe(88);
    expect(cards.every((card) => card.querySelector('img')?.getAttribute('alt'))).toBeTrue();
    expect(cards.every((card) => card.querySelector('h2') && card.querySelectorAll('p').length > 0)).toBeTrue();
  });

  it('renders the three arcade games and ML Pack with technology details', async () => {
    const fixture = await create(GamesPageComponent);
    const root = fixture.nativeElement as HTMLElement;
    const text = root.textContent ?? '';

    expect(root.querySelectorAll('.game-choice').length).toBe(4);
    expect(text).toContain('BreakBricksGame');
    expect(text).toContain('Snake');
    expect(text).toContain('Tetris');
    expect(text).toContain('C++ and Raylib');
    expect(text).toContain('Python and Pygame');
    expect(text).toContain('Angular, TypeScript, HTML Canvas');
    expect(text).toContain('ML Pack');
    expect(text).toContain('React, JavaScript, Vite, and Lucide');
    expect(text).toContain('C++17, CMake, and mlpack 4.x');
    expect(root.querySelector('a[href="/games/mlpack"]')).not.toBeNull();
  });

  it('hosts the original ML Pack interface on its own page', async () => {
    const fixture = await create(MlPackPageComponent);
    const root = fixture.nativeElement as HTMLElement;
    const frame = root.querySelector('iframe');

    expect(root.textContent).toContain('Interactive machine-learning experiments');
    expect(frame?.getAttribute('src')).toBe('/mlpack-studio/index.html');
    expect(frame?.getAttribute('title')).toContain('mlpack Studio');
    expect(frame?.getAttribute('sandbox')).toContain('allow-scripts');
  });
});

async function create<T>(component: Type<T>): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [provideRouter([])]
  }).compileComponents();
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
}
