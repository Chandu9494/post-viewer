import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'post-viewer-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly isBrowser: boolean;
  private readonly themeSubject: BehaviorSubject<Theme>;

  readonly theme$ = this.getThemeSubject().asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.themeSubject = new BehaviorSubject<Theme>(this.resolveInitialTheme());
    this.applyTheme(this.themeSubject.value);
  }

  get currentTheme(): Theme {
    return this.themeSubject.value;
  }

  toggleTheme(): void {
    const next: Theme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.themeSubject.next(next);
    this.applyTheme(next);
    this.persistTheme(next);
  }

  private resolveInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'dark';
    }

    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }
    document.documentElement.setAttribute('data-theme', theme);
  }

  private persistTheme(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  private getThemeSubject(): BehaviorSubject<Theme> {
    if (!this.themeSubject) {
      return new BehaviorSubject<Theme>('dark');
    }
    return this.themeSubject;
  }
}
