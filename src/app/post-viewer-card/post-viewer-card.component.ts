import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IPost } from '../shared/post-viewer.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
