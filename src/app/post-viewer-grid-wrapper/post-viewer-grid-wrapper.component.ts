import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PostViewerCardComponent } from '../post-viewer-card/post-viewer-card.component';
import { PostViewerActionService } from './services/post-viewer-action.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-post-viewer-grid-wrapper',
  standalone:true,
  imports: [CommonModule, PostViewerCardComponent, MatCardModule],
  templateUrl: './post-viewer-grid-wrapper.component.html',
  styleUrl: './post-viewer-grid-wrapper.component.scss',
})
export class PostViewerGridWrapperComponent implements OnInit {
  readonly postsList = this.postViewerActionService.postsList;
       
  constructor(
    private readonly postViewerActionService: PostViewerActionService
  ) {}

  ngOnInit(): void {
    this.postViewerActionService.initialize();
  }

  onCardClicked(postId: string) {
    this.postViewerActionService.onCardClicked(postId)
  }
}
