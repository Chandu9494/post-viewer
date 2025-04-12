import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IPost } from '../shared/post-viewer.interface';

@Component({
  selector: 'app-post-viewer-card',
  imports: [MatCardModule],
  templateUrl: './post-viewer-card.component.html',
  styleUrl: './post-viewer-card.component.scss'
})
export class PostViewerCardComponent {
  @Input() post: IPost | undefined;
}
