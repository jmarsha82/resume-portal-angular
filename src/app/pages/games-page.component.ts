import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-games-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-heading">
      <h1>Games</h1>
      <p>Choose a browser-native arcade game or open the interactive ML Pack machine-learning workbench.</p>
    </section>
    <section class="game-menu">
      <a class="panel game-choice" routerLink="/games/breakbricks">
        <span>Arcade 01</span>
        <h2>BreakBricksGame</h2>
        <p>Move the paddle with arrow keys, mouse, or a finger swipe on mobile.</p>
        <dl class="tech-stack-list" aria-label="BreakBricksGame tech stack">
          <div>
            <dt>Original</dt>
            <dd>C++ and Raylib</dd>
          </div>
          <div>
            <dt>Web Port</dt>
            <dd>Angular, TypeScript, HTML Canvas</dd>
          </div>
          <div>
            <dt>Controls</dt>
            <dd>Keyboard, mouse, and touch pointer input</dd>
          </div>
        </dl>
      </a>
      <a class="panel game-choice" routerLink="/games/snake">
        <span>Arcade 02</span>
        <h2>Snake</h2>
        <p>Use arrows/WASD or swipe in the direction you want the snake to turn.</p>
        <dl class="tech-stack-list" aria-label="Snake tech stack">
          <div>
            <dt>Original</dt>
            <dd>C++ and Raylib</dd>
          </div>
          <div>
            <dt>Web Port</dt>
            <dd>Angular, TypeScript, HTML Canvas</dd>
          </div>
          <div>
            <dt>Controls</dt>
            <dd>Keyboard and mobile swipe gestures</dd>
          </div>
        </dl>
      </a>
      <a class="panel game-choice" routerLink="/games/tetris">
        <span>Arcade 03</span>
        <h2>Tetris</h2>
        <p>Drag left or right to move, swipe down to drop, and rotate your finger motion to turn the piece.</p>
        <dl class="tech-stack-list" aria-label="Tetris tech stack">
          <div>
            <dt>Original</dt>
            <dd>Python and Pygame</dd>
          </div>
          <div>
            <dt>Web Port</dt>
            <dd>Angular, TypeScript, HTML Canvas</dd>
          </div>
          <div>
            <dt>Controls</dt>
            <dd>Keyboard, drag, swipe, and rotation gestures</dd>
          </div>
        </dl>
      </a>
      <a class="panel game-choice" routerLink="/games/mlpack">
        <span>Lab 04</span>
        <h2>ML Pack</h2>
        <p>Configure datasets and explore classification, regression, clustering, anomaly detection, recommendations, and more.</p>
        <dl class="tech-stack-list" aria-label="ML Pack tech stack">
          <div>
            <dt>Interface</dt>
            <dd>React, JavaScript, Vite, and Lucide</dd>
          </div>
          <div>
            <dt>Native Engine</dt>
            <dd>C++17, CMake, and mlpack 4.x</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>Browser demo with optional local C++ computation</dd>
          </div>
        </dl>
      </a>
    </section>
  `
})
export class GamesPageComponent {}
