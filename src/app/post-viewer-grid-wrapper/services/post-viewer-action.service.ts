import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import { IPost } from '../../shared/post-viewer.interface';
import { Store } from '@ngrx/store';
import { getPosts, resetCards, selectPost } from '../../store/posts.action';
import {
  selectAllPosts,
  selectPropertyKeyMap,
} from '../../store/posts.selectors';

@Injectable({ providedIn: 'root' })
export class PostViewerActionService {
  private readonly _displayKey = new BehaviorSubject<string>('title');
  private _selectedPostId = new BehaviorSubject<number>(0);
  private _destroy = new Subject();

  postsList: Observable<IPost[]>;
  displayKey: Observable<string>;
  selectedPostIdObs: Observable<number>;
  selectedPostId: number = -1;

  constructor(private readonly store: Store) {
    this.postsList = this.store.select(selectAllPosts);
    this.displayKey = this._displayKey.asObservable();
    this.selectedPostIdObs = this._selectedPostId.asObservable();
  }

  initialize(): void {
    this.dispatchLoadPosts();
  }

  onDestroy(): void {
    this._destroy.next('');
    this._destroy.complete();
  }

  dispatchLoadPosts(): void {
    this.store.dispatch(getPosts());
  }

  onCardClicked(postId: number): void {
    this._selectedPostId.next(postId);
    this.store.dispatch(selectPost({ postId }));
    this.getDisplayValue(postId);
  }

  getDisplayValue(postId: number): void {
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
    this._selectedPostId.next(0);
    this.store.dispatch(resetCards());
    this.onDestroy();
  }
}
