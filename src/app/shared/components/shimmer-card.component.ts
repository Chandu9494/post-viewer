import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-shimmer-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="shimmer-card" appearance="outlined">
      <div class="shimmer-card__image"></div>
      <div class="shimmer-card__content">
        <div class="shimmer-card__title"></div>
        <div class="shimmer-card__description"></div>
        <div class="shimmer-card__description short"></div>
      </div>
    </mat-card>
  `,
  styleUrl: './shimmer-card.component.scss'
})
export class ShimmerCardComponent {}
