import { createReducer, on } from '@ngrx/store';
import * as PostActions from './posts.action'
import { IPostsState } from '../shared/post-viewer.interface';


export const initialState: IPostsState = {
  posts: [],
  error: null
};

export const postsReducer = createReducer(
  initialState,
  on(PostActions.postFetchSuccess, (state, { posts }) => ({
    ...state,
    posts,
    error: null
  })),
  on(PostActions.postFetchFailed, (state, { error }) => ({
    ...state,
    error
  }))
);