import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { IPost } from '../../shared/post-viewer.interface';
import { Store } from '@ngrx/store';
import { getPosts, resetCards, selectPost } from '../../store/posts.action';
import {
  selectAllPosts,
  selectImages,
  selectPropertyKeyMap,
} from '../../store/posts.selectors';
import { loadImages } from '../../store/image.action';

@Injectable({ providedIn: 'root' })
export class PostViewerActionService {
  private readonly _displayKey = new BehaviorSubject<string>('title');
  private _selectedPostId = new BehaviorSubject<string>('');
  private _destroy = new Subject();

  postsList: Observable<IPost[]>;
  displayKey: Observable<string>;
  selectedPostIdObs: Observable<string>;
  selectedPostId: string = '';
  images: Observable<string[]>;
  loadingObs: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.images = this.store.select(selectImages);
    this.postsList = combineLatest([
      this.store.select(selectAllPosts),
      this.images
    ]).pipe(
      filter(([posts, images]) => posts.length > 0),
      map(([posts, images]) =>
        posts.map((post, index) => ({
          ...post,
          imageUrl: post.imageUrl || images[index % images.length]
        }))
      )
    );
    this.displayKey = this._displayKey.asObservable();
    this.selectedPostIdObs = this._selectedPostId.asObservable();
    this.loadingObs = combineLatest([
      this.store.select(selectAllPosts),
      this.images
    ]).pipe(
      map(([posts, images]) => !(posts.length && images.length))
    );

  }

  initialize(): void {
    this.dispatchLoadPosts();
  }

  onDestroy(): void {
    this._destroy.next('');
    this._destroy.complete();
  }

  dispatchLoadPosts(initial = false): void {
    this.store.dispatch(getPosts());
    this.store.dispatch(loadImages());
  }

  onCardClicked(postId: string): void {
    this._selectedPostId.next(postId);
    this.store.dispatch(selectPost({ postId }));
    this.getDisplayValue(postId);
  }

  getDisplayValue(postId: string): void {
    this.store
      .select(selectPropertyKeyMap)
      .pipe(
        takeUntil(this._destroy),
        map((keyMap) => {
          const key = keyMap[postId] || 'title';
          this._displayKey.next(key);
        })
      )
      .subscribe();
  }

  onResetClicked(): void {
    this._selectedPostId.next('');
    this.store.dispatch(resetCards());
    this.onDestroy();
  }
}
