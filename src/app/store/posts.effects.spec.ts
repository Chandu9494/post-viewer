import {
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, take, throwError } from 'rxjs';
import { PostsEffects } from './posts.effects';
import { PostViewerApiService } from '../post-viewer-grid-wrapper/services/post-viewer-api.service';
import * as PostActions from './posts.action';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { IPost } from '../shared/post-viewer.interface';
import { selectAllPosts, selectPropertyKeyMap } from './posts.selectors';

describe('PostsEffects', () => {
  let actionsObs: Observable<Action>;
  let effects: PostsEffects;
  let store: MockStore;
  let postViewerApiService: jasmine.SpyObj<PostViewerApiService>;

  const mockPosts: IPost[] = [
    {
      id: 1,
      title: 'Post 1',
      userId: '1',
      body: '',
    },
    {
      id: 2,
      title: 'Post 2',
      userId: '2',
      body: '',
    },
  ];

  beforeEach(() => {
    const spyApiService = jasmine.createSpyObj('PostViewerApiService', [
      'getPosts',
    ]);

    TestBed.configureTestingModule({
      providers: [
        PostsEffects,
        provideMockActions(() => actionsObs),
        provideMockStore({
          selectors: [],
        }),
        { provide: PostViewerApiService, useValue: spyApiService },
      ],
    });

    effects = TestBed.inject(PostsEffects);
    store = TestBed.inject(MockStore);
    postViewerApiService = TestBed.inject(
      PostViewerApiService
    ) as jasmine.SpyObj<PostViewerApiService>;
  });

  it('should dispatch postFetchSuccess on successful API call', (done) => {
    const action = PostActions.getPosts();
    const res = PostActions.postFetchSuccess({ posts: mockPosts });
    actionsObs = of(action);
    postViewerApiService.getPosts.and.returnValue(of(mockPosts));

    effects.loadPostsObs.subscribe((result) => {
      expect(result).toEqual(res);
      done();
    });
  });

  it('should dispatch postFetchFailed on API error', (done) => {
    const action = PostActions.getPosts();
    const error = 'Error';
    const res = PostActions.postFetchFailed({ error });
    actionsObs = of(action);
    postViewerApiService.getPosts.and.returnValue(throwError(() => error));

    effects.loadPostsObs.subscribe((result) => {
      expect(result).toEqual(res);
      done();
    });
  });

  it('should return failure action if post not found', fakeAsync(() => {
    store.overrideSelector(selectAllPosts, []);
    store.overrideSelector(selectPropertyKeyMap, {});
    store.refreshState();
    const expectedAction = { type: 'Load Failed' };
    const action = PostActions.selectPost({ postId: 6 });
    actionsObs = of(action);
    tick();
    flush();
    flushMicrotasks();
    effects.selectPostObs.subscribe((result) => {
      expect(result).toEqual(expectedAction);
    });
  }));

  it('should dispatch reset all the other cards to fallback value when a tile is clicked', fakeAsync(() => {
    store.overrideSelector(selectAllPosts, mockPosts);
    const postId = 1;
    const action = PostActions.selectPost({ postId });
    actionsObs = of(action);
    effects.selectPostObs.pipe(take(1)).subscribe((res) => {
      expect(res.type).toContain('Reset all cards');
    });
  }));
});
