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

export const createPost = createAction(
  'Create Post',
  props<{ post: FormData }>()
);

export const createPostSuccess = createAction(
  'Create Post Success',
  props<{ post: IPost }>()
);

export const createPostFailure = createAction(
  'Create Post Failure',
  props<{ error: string }>()
);

export const updatePost = createAction(
  'Update Post',
  props<{ postId: string; post: FormData }>()
);

export const updatePostSuccess = createAction(
  'Update Post Success',
  props<{ post: IPost }>()
);

export const updatePostFailure = createAction(
  'Update Post Failure',
  props<{ error: string }>()
);

export const deletePost = createAction(
  'Delete Post',
  props<{ postId: string }>()
);

export const deletePostSuccess = createAction(
  'Delete Post Success',
  props<{ postId: string }>()
);

export const loadMorePosts = createAction(
  'Load More Posts',
  props<{ page: number; sortBy: string; sortOrder: string }>()
);

export const loadMorePostsSuccess = createAction(
  'Load More Posts Success',
  props<{ posts: IPost[]; hasMore: boolean }>()
);

export const loadMorePostsFailure = createAction(
  'Load More Posts Failure',
  props<{ error: string }>()
);

export const selectPost = createAction(
  'Select Post',
  props<{ postId: string }>()
);

export const setDisplayedPropertyKey = createAction(
  'Display next property',
  props<{ postId: string; displayedKey: string }>()
);

export const resetCards = createAction('Reset all cards');
