import { Routes } from '@angular/router';

import { ArtistPageComponent } from './pages/artist-page.component';
import { GamePageComponent } from './pages/game-page.component';
import { GamesPageComponent } from './pages/games-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { ProgrammerPageComponent } from './pages/programmer-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Justin Marshall' },
  { path: 'programmer', component: ProgrammerPageComponent, title: 'Programmer Profile' },
  { path: 'artist', component: ArtistPageComponent, title: 'Artist Profile' },
  { path: 'games', component: GamesPageComponent, title: 'Games' },
  { path: 'games/:id', component: GamePageComponent, title: 'Play Game' },
  { path: 'about', redirectTo: '' },
  { path: '**', redirectTo: '' }
];
