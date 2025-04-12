import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs';
import { IPost } from '../../shared/post-viewer.interface';
import { PostViewerApiService } from './post-viewer-api.service';
import { Store } from '@ngrx/store';
import { getPosts } from '../../store/posts.action';
import { selectAllPosts } from '../../store/posts.selectors';

@Injectable({ providedIn: 'root' }) //don't neeed in root level
export class PostViewerActionService {
  private readonly _posts = new BehaviorSubject<IPost[]>([]);
  private _destroy = new Subject();
  postsList: Observable<IPost[]>;

  constructor(
    private readonly postViewerApiService: PostViewerApiService,
    private readonly store: Store
  ) {
    this.postsList = this.store.select(selectAllPosts)
    // this.postsList = this._posts.asObservable();
  }

  initialize(): void {
    //  this.postViewerApiService.getPosts().subscribe((res) => {
    //   console.log(res);
    // });

    // this.postViewerApiService.getPosts()
    //   .pipe(takeUntil(this._destroy))
    //   .subscribe((posts) => {
    //     this._posts.next(posts);
    //   });
    this.dispatchLoadPosts();
  }

  onDestroy() {
    this._destroy.next('');
    this._destroy.complete();
  }

  dispatchLoadPosts() {
    this.store.dispatch(getPosts());
  }

  onCardClicked(postId: string){
    console.log('receivedPost', postId)
  }
}
