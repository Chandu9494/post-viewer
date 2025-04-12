import { Injectable } from '@angular/core';
import * as PostActions from './posts.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { PostViewerApiService } from '../post-viewer-grid-wrapper/services/post-viewer-api.service';

@Injectable()
export class PostsEffects {
  constructor(
    private readonly actions: Actions,
    private readonly postViewerApiService: PostViewerApiService
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
}
