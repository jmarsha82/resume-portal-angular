import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="mockup-home" aria-labelledby="home-title">
      <aside class="profile-console">
        <div class="portrait-frame">
          <img src="/img/mockup/profile-cyberpunk.png" alt="Cyberpunk portrait of Justin Marshall">
        </div>
        <div class="profile-info">
          <h2><span>Justin</span> Marshall</h2>
          <ul aria-label="Profile summary">
            <li>Software Engineer</li>
            <li>Artist</li>
            <li>jmarsha82&#64;yahoo.com</li>
            <li>Saint Louis, MO Area</li>
          </ul>
          <div class="social-row" aria-label="Social links">
            <a href="https://github.com/jmarsha82" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.6a9.4 9.4 0 0 0-3 18.31c.47.09.65-.2.65-.45v-1.58c-2.66.58-3.22-1.12-3.22-1.12-.43-1.09-1.06-1.38-1.06-1.38-.87-.59.07-.58.07-.58.96.07 1.46.99 1.46.99.85 1.45 2.23 1.03 2.77.79.09-.62.33-1.03.61-1.27-2.12-.24-4.35-1.06-4.35-4.71 0-1.04.37-1.89.98-2.56-.1-.24-.43-1.22.09-2.53 0 0 .8-.26 2.6.98A8.97 8.97 0 0 1 12 6.16c.8 0 1.61.11 2.37.32 1.8-1.24 2.59-.98 2.59-.98.52 1.31.19 2.29.09 2.53.61.67.98 1.52.98 2.56 0 3.66-2.24 4.47-4.37 4.7.34.3.65.88.65 1.78v2.64c0 .25.17.55.66.45A9.4 9.4 0 0 0 12 2.6Z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5.1 8.7h3.15v10.1H5.1V8.7Zm1.57-4.95a1.83 1.83 0 1 1 0 3.66 1.83 1.83 0 0 1 0-3.66Zm3.55 4.95h3.02v1.38h.04c.42-.8 1.45-1.65 2.99-1.65 3.2 0 3.79 2.11 3.79 4.85v5.52h-3.15v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6v4.98h-3.17V8.7Z"/>
              </svg>
            </a>
            <a href="mailto:jmarsha82@yahoo.com" aria-label="Email Justin Marshall">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.4 5.5h17.2c.77 0 1.4.63 1.4 1.4v10.2c0 .77-.63 1.4-1.4 1.4H3.4c-.77 0-1.4-.63-1.4-1.4V6.9c0-.77.63-1.4 1.4-1.4Zm.78 2.1 7.82 5.34 7.82-5.34H4.18Zm15.72 8.8V9.76l-7.32 5a1 1 0 0 1-1.16 0l-7.32-5v6.64h15.8Z"/>
              </svg>
            </a>
          </div>
        </div>
      </aside>

      <div class="hero-identity">
        <h1 id="home-title"><span>Justin</span><span>Marshall</span></h1>
        <div class="persona-switch" aria-label="Profile paths">
          <span>Programmer</span>
          <span aria-hidden="true">//</span>
          <span>Artist</span>
        </div>
        <div class="hero-actions">
          <a class="button ghost" href="http://127.0.0.1:4100">Profile Select</a>
          <a class="button primary" routerLink="/programmer">View Programmer</a>
          <a class="button secondary" routerLink="/artist">View Artist</a>
        </div>
      </div>

      <aside class="home-rail" aria-label="Featured work">
        <a class="concept-panel featured-art" routerLink="/artist" aria-label="View artist gallery">
          <div class="panel-title-row">
            <h2>Featured Art</h2>
          </div>
          <img class="featured-art-image" src="/img/artist/beauty_with_butterfly_wings.jpg" alt="Beauty with Butterfly Wings">
          <div class="thumbnail-strip" aria-label="Artwork preview thumbnails">
            <img src="/img/artist/diamond_rimmed_dahlia.jpg" alt="Diamond Rimmed Dahlia">
            <img src="/img/artist/gaze_through_me.jpg" alt="Gaze Through Me">
            <img src="/img/artist/overglammed.jpg" alt="Overglammed">
            <img src="/img/artist/twiggy_glasses.jpg" alt="Twiggy Glasses">
          </div>
        </a>

        <section class="concept-panel games-preview">
          <div class="panel-title-row">
            <h2>Games</h2>
          </div>
          <div class="game-tile-grid">
            <a routerLink="/games/breakbricks" class="game-tile">
              <img src="/img/mockup/game-breakbricks.png" alt="BreakBricksGame preview">
            </a>
            <a routerLink="/games/snake" class="game-tile">
              <img src="/img/mockup/game-snake.png" alt="Snake preview">
            </a>
            <a routerLink="/games/tetris" class="game-tile">
              <img src="/img/mockup/game-tetris.png" alt="Tetris preview">
            </a>
          </div>
          <a class="button game-button" routerLink="/games">Explore Games</a>
        </section>
      </aside>

      <section class="what-i-do concept-panel" aria-labelledby="what-i-do-title">
        <h2 id="what-i-do-title">What I Do</h2>
        <div>
          <a routerLink="/programmer">
            <span aria-hidden="true">BOX</span>
            <h3>Software Engineering</h3>
            <p>Crafting clean, scalable, and maintainable code with best practices in mind.</p>
          </a>
          <a routerLink="/artist">
            <span aria-hidden="true">ART</span>
            <h3>Oil Paintings</h3>
            <p>Creating oil-on-canvas artwork with bold portraiture, texture, color, and expressive detail.</p>
          </a>
          <a routerLink="/games">
            <span aria-hidden="true">PAD</span>
            <h3>Game Development</h3>
            <p>Designing and building fun, challenging games with classic and modern mechanics.</p>
          </a>
        </div>
      </section>
    </section>
  `
})
export class HomePageComponent {}
