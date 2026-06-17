import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { provideRouter } from '@angular/router';

import { ArtistPageComponent } from './artist-page.component';
import { GamesPageComponent } from './games-page.component';
import { HomePageComponent } from './home-page.component';
import { ProgrammerPageComponent } from './programmer-page.component';

describe('Page components', () => {
  it('renders the home Games button', async () => {
    const fixture = await create(HomePageComponent);
    expect(fixture.nativeElement.textContent).toContain('Games');
  });

  it('renders programmer profile content and static links', async () => {
    const fixture = await create(ProgrammerPageComponent);
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Programmer at Boeing');
    expect(text).toContain('Dev Books');
    expect(text).toContain('Angular');
  });

  it('renders all extracted artwork cards', async () => {
    const fixture = await create(ArtistPageComponent);
    expect(fixture.nativeElement.querySelectorAll('.artwork-card').length).toBe(88);
  });

  it('renders the three game choices', async () => {
    const fixture = await create(GamesPageComponent);
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('BreakBricksGame');
    expect(text).toContain('Snake');
    expect(text).toContain('Tetris');
    expect(text).toContain('C++ and Raylib');
    expect(text).toContain('Python and Pygame');
    expect(text).toContain('Angular, TypeScript, HTML Canvas');
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
