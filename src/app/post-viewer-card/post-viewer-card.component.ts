import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IPost } from '../shared/post-viewer.interface';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-viewer-card',
  imports: [MatCardModule, CommonModule, MatTooltipModule, MatIconModule],
  templateUrl: './post-viewer-card.component.html',
  styleUrl: './post-viewer-card.component.scss',
})
export class PostViewerCardComponent implements OnChanges {
  @Input() post: IPost | undefined;
  @Input() displayValue: string | null = 'title';
  @Input() selectedPostId: number | null = 0;
  @Input() isLoading = false;
  @Input() isFavourite = false;
  @Output() favouriteToggled = new EventEmitter<number>();
  readonly displayFields = ['userId', 'id', 'title', 'body'];
  displayText: string | number = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['displayValue']) {
      if (this.post) {
        this.displayText =  this.post[this.displayValue as keyof IPost] ?? '';
      }
    }
  }
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://picsum.photos/300/200';
  }

  onFavouriteClick(event: Event): void {
    event.stopPropagation();
    if (this.post) {
      this.favouriteToggled.emit(this.post.id);
    }
  }
}
