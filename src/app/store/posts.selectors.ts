import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPostsState } from '../shared/post-viewer.interface';

export const selectPostsState = createFeatureSelector<IPostsState>('posts');

export const selectAllPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const selectActivePostId = createSelector(
  selectPostsState,
  (state) => state.selectedPostId
);

export const selectActivePost = createSelector(
  selectAllPosts,
  selectActivePostId,
  (allPosts, selectedId) => allPosts.find((post) => post?.id === selectedId)
);

export const selectPropertyKeyMap = createSelector(
  selectPostsState,
  (state: IPostsState) => state.propertyKeyMap
);

export const selectImages = (state: any) => state.images.images ?? [];