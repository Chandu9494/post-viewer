import { createReducer, on } from '@ngrx/store';
import * as PostActions from './posts.action';
import { initialState } from '../shared/post-viewer.constants';
import { loadImages, loadImagesSuccess, loadImagesFailure } from './image.action';
import { ImageState } from '../shared/post-viewer.interface';

export const postsReducer = createReducer(
  initialState,
  on(PostActions.postFetchSuccess, (state, { posts }) => ({
    ...state,
    posts,
    error: null,
  })),
  on(PostActions.postFetchFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PostActions.selectPost, (state, { postId }) => ({
    ...state,
    selectedPostId: postId,
    error: null,
  })),
  on(
    PostActions.setDisplayedPropertyKey,
    (state, { postId, displayedKey }) => ({
      ...state,
      propertyKeyMap: {
        ...state.propertyKeyMap,
        [postId]: displayedKey,
      },
    })
  ),
  on(PostActions.resetCards, (state) => ({
    ...state,
    propertyKeyMap: {},
  }))
);

export const imageReducer = createReducer(
  initialState,
  on(loadImages, state => ({ ...state, loading: true })),
  on(loadImagesSuccess, (state, { images }) => ({
    ...state,
    loading: false,
    images
  })),
  on(loadImagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);