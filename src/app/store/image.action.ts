import { createAction, props } from '@ngrx/store';

export const loadImages = createAction('[Images] Load');

export const loadImagesSuccess = createAction(
  '[Images] Load Success',
  props<{ images: string[] }>()
);

export const loadImagesFailure = createAction(
  '[Images] Load Failure',
  props<{ error: any }>()
);