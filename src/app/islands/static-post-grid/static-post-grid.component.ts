import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-static-post-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="static-post-grid">
      <div class="static-post-grid__header">
        <h1 class="static-post-grid__title">Post Viewer</h1>
        <p class="static-post-grid__subtitle">Browse and manage your posts</p>
      </div>
      
      <div class="static-post-grid__controls">
        <div class="static-post-grid__search">
          <input 
            type="text" 
            placeholder="Search posts..." 
            class="static-post-grid__search-input"
          />
        </div>
        <div class="static-post-grid__filters">
          <select class="static-post-grid__sort-select">
            <option value="createdAt">Date Created</option>
            <option value="title">Title</option>
            <option value="body">Description</option>
          </select>
          <button class="static-post-grid__sort-order">
            <span>↓</span>
          </button>
          <button class="static-post-grid__fav-filter">
            <span>♡</span>
          </button>
        </div>
      </div>

      <div class="static-post-grid__grid">
        <!-- Static HTML islands for immediate rendering -->
        <div class="post-card-island" *ngFor="let post of staticPosts">
          <div class="post-card-island__image-wrapper">
            <img 
              class="post-card-island__image" 
              [src]="post.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzk5OTk5OSI+SW1hZ2UgdW5hdmFpbGFibGU8L3RleHQ+PC9zdmc+'" 
              [alt]="post.title"
              loading="lazy"
            />
            <div class="post-card-island__actions">
              <button class="post-card-island__favourite-btn">
                <span class="icon">♡</span>
              </button>
              <button class="post-card-island__edit-btn">
                <span class="icon">✏️</span>
              </button>
            </div>
          </div>
          <div class="post-card-island__content">
            <h3 class="post-card-island__title">{{ post.title }}</h3>
            <p class="post-card-island__description">{{ post.body }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './static-post-grid.component.scss'
})
export class StaticPostGridComponent {
  @Input() staticPosts: any[] = [];

  constructor() {
    // This component renders static HTML immediately
    // Interactive functionality will be added by progressive hydration
  }
}
