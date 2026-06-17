import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { BreakBricksGameComponent } from '../games/break-bricks-game.component';
import { SnakeGameComponent } from '../games/snake-game.component';
import { TetrisGameComponent } from '../games/tetris-game.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [RouterLink, BreakBricksGameComponent, SnakeGameComponent, TetrisGameComponent],
  template: `
    <section class="page-heading game-heading">
      <a class="button ghost compact" routerLink="/games">Back to Games</a>
      <h1>{{ title() }}</h1>
      <p>{{ helpText() }}</p>
    </section>
    <section class="game-stage panel">
      @switch (gameId()) {
        @case ('breakbricks') {
          <app-break-bricks-game />
        }
        @case ('snake') {
          <app-snake-game />
        }
        @case ('tetris') {
          <app-tetris-game />
        }
        @default {
          <p>Choose a game from the game menu.</p>
        }
      }
    </section>
  `
})
export class GamePageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly gameId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id') ?? '')), { initialValue: '' });
  readonly title = computed(() => ({
    breakbricks: 'BreakBricksGame',
    snake: 'Snake',
    tetris: 'Tetris'
  })[this.gameId()] ?? 'Game');
  readonly helpText = computed(() => ({
    breakbricks: 'Keyboard, mouse, and finger-drag paddle controls.',
    snake: 'Keyboard and swipe direction controls.',
    tetris: 'Keyboard plus mobile drag, swipe, and rotation gestures.'
  })[this.gameId()] ?? 'Browser game');
}
