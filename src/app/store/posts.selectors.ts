import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPostsState } from '../shared/post-viewer.interface';


export const selectPostsState = createFeatureSelector<IPostsState>('posts');

export const selectAllPosts = createSelector(
  selectPostsState,
  state => state.posts
);