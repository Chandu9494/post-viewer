import { Injectable } from '@angular/core';
import * as PostActions from './posts.action';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { PostViewerApiService } from '../post-viewer-grid-wrapper/services/post-viewer-api.service';
import { Store } from '@ngrx/store';
import { selectAllPosts, selectImages, selectPropertyKeyMap } from './posts.selectors';
import { ImageService } from '../shared/services/post-viewer-image.service';
import { loadImages, loadImagesSuccess, loadImagesFailure } from './image.action';

@Injectable()
export class PostsEffects {
  readonly displayOrder = ['userId', 'id', 'title', 'body'];
  readonly placeholderKey = 'title';

  constructor(
    private readonly actions: Actions,
    private readonly postViewerApiService: PostViewerApiService,
    private readonly store: Store,
    private readonly imageService: ImageService,
  ) {}

  loadPostsObs = createEffect(() =>
    this.actions.pipe(
      ofType(PostActions.getPosts),
      switchMap(() =>
        this.postViewerApiService.getPosts().pipe(
          map((posts) => PostActions.postFetchSuccess({ posts })),
          catchError((error) => of(PostActions.postFetchFailed({ error })))
        )
      )
    )
  );

  selectPostObs = createEffect(() =>
    this.actions.pipe(
      ofType(PostActions.selectPost),
      withLatestFrom(
        this.store.select(selectAllPosts),
        this.store.select(selectPropertyKeyMap)
      ),
      mergeMap(([action, posts, keyMap]) => {
        if (!posts.length) {
          return of({ type: 'Load Failed' });
        }

        const post = posts.find((p) => p.id === action.postId);
        if (!post) {
          return of({ type: 'No Post Found' });
        }

        const currentKey = keyMap[action.postId];
        const currentIndex = currentKey
          ? this.displayOrder.indexOf(currentKey)
          : -1;

        const nextIndex = (currentIndex + 1) % this.displayOrder.length;

        return of(
          PostActions.resetCards(),
          PostActions.setDisplayedPropertyKey({
            postId: action.postId,
            displayedKey: this.displayOrder[nextIndex],
          })
        );
      })
    )
  );

  loadImagesObs = createEffect(() =>
  this.actions.pipe(
    ofType(loadImages),
    withLatestFrom(this.store.select(selectImages)),
    filter(([_, images]) => !images || images.length === 0),
    switchMap(() =>
      this.imageService.getImages().pipe(
        map(images => loadImagesSuccess({ images })),
        catchError(error => of(loadImagesFailure({ error })))
      )
    )
  )
);
}
