import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./post-viewer-grid-wrapper/post-viewer-grid-wrapper.component').then(m => m.PostViewerGridWrapperComponent),
    title: 'Post Viewer'
  }
];
