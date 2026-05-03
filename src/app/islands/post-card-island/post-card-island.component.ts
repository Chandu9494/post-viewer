import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card-island',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="post-card-island" [class.interactive]="isInteractive">
      <div class="post-card-island__image-wrapper" *ngIf="post?.imageUrl">
        <img 
          class="post-card-island__image" 
          [src]="post.imageUrl" 
          [alt]="post.title"
          loading="lazy"
          (error)="onImageError($event)"
        />
        <div class="post-card-island__actions" *ngIf="isInteractive">
          <button 
            class="post-card-island__favourite-btn"
            [class.active]="isFavourite"
            (click)="onFavouriteClick($event)"
            aria-label="Toggle favourite"
          >
            <span class="icon">{{ isFavourite ? '♥' : '♡' }}</span>
          </button>
          <button 
            class="post-card-island__edit-btn"
            (click)="onEditClick($event)"
            aria-label="Edit post"
          >
            <span class="icon">✏️</span>
          </button>
        </div>
      </div>
      <div class="post-card-island__content">
        <h3 class="post-card-island__title">{{ post.title }}</h3>
        <p class="post-card-island__description">{{ post.body }}</p>
      </div>
    </div>
  `,
  styleUrl: './post-card-island.component.scss'
})
export class PostCardIslandComponent implements OnInit, OnDestroy {
  @Input() post: any;
  @Input() isFavourite = false;
  @Output() favouriteToggled = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<any>();

  isInteractive = false;
  private hydrationTimer: any;

  ngOnInit(): void {
    // Progressive hydration - make interactive after 100ms
    this.hydrationTimer = setTimeout(() => {
      this.isInteractive = true;
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.hydrationTimer) {
      clearTimeout(this.hydrationTimer);
    }
  }

  onFavouriteClick(event: Event): void {
    event.stopPropagation();
    if (this.isInteractive && this.post) {
      this.favouriteToggled.emit(this.post._id);
    }
  }

  onEditClick(event: Event): void {
    event.stopPropagation();
    if (this.isInteractive && this.post) {
      this.editClicked.emit(this.post);
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzk5OTk5OSI+SW1hZ2UgdW5hdmFpbGFibGU8L3RleHQ+PC9zdmc+';
  }
}
