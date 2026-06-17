import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'resume-portal-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>(this.readInitialTheme());

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.applyTheme(this.mode());
  }

  toggle(): void {
    const next = this.mode() === 'dark' ? 'light' : 'dark';
    this.setMode(next);
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
    this.document.defaultView?.localStorage.setItem(STORAGE_KEY, mode);
    this.applyTheme(mode);
  }

  private readInitialTheme(): ThemeMode {
    const stored = globalThis.localStorage?.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  }

  private applyTheme(mode: ThemeMode): void {
    this.document.documentElement.dataset['theme'] = mode;
  }
}
