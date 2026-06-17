import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app-shell">
      <div class="window-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <header class="topbar">
        <button class="icon-button menu-toggle" type="button" (click)="menuOpen.update(open => !open)" [attr.aria-expanded]="menuOpen()" aria-label="Toggle navigation">
          <span aria-hidden="true">MENU</span>
        </button>
        <a class="brand" routerLink="/">
          <span class="brand-mark" aria-hidden="true">JM</span>
          <span class="brand-name">Justin Marshall</span>
        </a>
        <nav [class.menu-open]="menuOpen()" aria-label="Primary navigation">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/programmer" routerLinkActive="active">Programmer</a>
          <a routerLink="/artist" routerLinkActive="active">Artist</a>
          <a routerLink="/games" routerLinkActive="active">Games</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
        </nav>
        <button class="icon-button theme-toggle" type="button" (click)="theme.toggle()" [attr.aria-label]="'Switch to ' + (theme.mode() === 'dark' ? 'light' : 'dark') + ' mode'">
          <span aria-hidden="true">{{ theme.mode() === 'dark' ? 'Dark / Light' : 'Light / Dark' }}</span>
        </button>
        <p class="theme-save-note">Theme preference saved across the app</p>
      </header>
      <main>
        <router-outlet />
      </main>
    </div>
  `
})
export class AppComponent {
  readonly theme = inject(ThemeService);
  readonly menuOpen = signal(false);
}
