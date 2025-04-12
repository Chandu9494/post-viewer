import { createAction, props } from '@ngrx/store';
import { IPost } from '../shared/post-viewer.interface';

export const getPosts = createAction('Load Posts From API');

export const postFetchSuccess = createAction(
  'Load Success',
  props<{ posts: IPost[] }>()
);

export const postFetchFailed = createAction(
  'Load failed',
  props<{ error: string | null }>()
);

export const selectPost = createAction(
  'Select Post',
  props<{ postId: number }>()
);

export const setDisplayedPropertyKey = createAction(
  'Display next property',
  props<{ postId: number; displayedKey: string }>()
);

export const resetCards = createAction('Reset all cards');
