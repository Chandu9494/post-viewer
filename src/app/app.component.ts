import { Component } from '@angular/core';
import { PostViewerGridWrapperComponent } from './post-viewer-grid-wrapper/post-viewer-grid-wrapper.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [PostViewerGridWrapperComponent, MatIconModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'post-viewer';
}
