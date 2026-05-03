import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSlideToggleModule],
  template: `
    <header class="header">
      <div class="header__content">
        <div class="header__left">
          <h1 class="header__title">Post Viewer</h1>
          <p class="header__subtitle">Browse and manage your posts</p>
        </div>
        <div class="header__right">
          <button mat-icon-button class="header__theme-toggle" (click)="toggleTheme()" aria-label="Toggle theme">
            <mat-icon>{{ isDarkMode ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
