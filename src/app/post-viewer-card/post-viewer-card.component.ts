import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LazyLoadDirective } from '../shared/directives/lazy-load.directive';
import { IPost } from '../shared/post-viewer.interface';

@Component({
  selector: 'app-post-viewer-card',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './post-viewer-card.component.html',
  styleUrl: './post-viewer-card.component.scss',
})
export class PostViewerCardComponent {
  @Input() post: IPost | undefined;
  @Input() selectedPostId: string | null = null;
  @Input() isLoading = false;
  @Input() isFavourite = false;
  @Output() favouriteToggled = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<IPost>();

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://picsum.photos/300/200';
  }

  onFavouriteClick(event: Event): void {
    event.stopPropagation();
    if (this.post) {
      this.favouriteToggled.emit(this.post._id);
    }
  }

  onEditClick(event: Event): void {
    event.stopPropagation();
    if (this.post) {
      this.editClicked.emit(this.post);
    }
  }
}
