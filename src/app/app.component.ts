import { Component } from '@angular/core';
import { PostViewerGridWrapperComponent } from './post-viewer-grid-wrapper/post-viewer-grid-wrapper.component';

@Component({
  selector: 'app-root',
  imports: [PostViewerGridWrapperComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'post-viewer';
}
