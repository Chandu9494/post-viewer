import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PostViewerCardComponent } from '../post-viewer-card/post-viewer-card.component';
import { PostViewerActionService } from './services/post-viewer-action.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-viewer-grid-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    PostViewerCardComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './post-viewer-grid-wrapper.component.html',
  styleUrl: './post-viewer-grid-wrapper.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostViewerGridWrapperComponent implements OnInit, OnDestroy {
  readonly postsList = this.postViewerActionService.postsList;
  readonly displayKey = this.postViewerActionService.displayKey;
  readonly selectedPostId = this.postViewerActionService.selectedPostIdObs;

  constructor(
    private readonly postViewerActionService: PostViewerActionService
  ) {}

  ngOnInit(): void {
    this.postViewerActionService.initialize();
  }

  onCardClicked(postId: number) {
    this.postViewerActionService.onCardClicked(postId);
  }

  onResetClicked(): void {
    this.postViewerActionService.onResetClicked();
  }

  ngOnDestroy(): void {
    this.postViewerActionService.onDestroy();
  }
}
