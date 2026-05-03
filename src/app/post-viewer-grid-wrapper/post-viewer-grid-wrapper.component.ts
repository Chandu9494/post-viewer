import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PostViewerCardComponent } from '../post-viewer-card/post-viewer-card.component';
import { PostViewerActionService } from './services/post-viewer-action.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ThemeService } from '../shared/services/theme.service';
import { FavouritesService } from '../shared/services/favourites.service';
import { IPost } from '../shared/post-viewer.interface';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { ShimmerCardComponent } from '../shared/components/shimmer-card.component';
import { Store } from '@ngrx/store';
import * as PostActions from '../store/posts.action';
import { selectAllPosts } from '../store/posts.selectors';

@Component({
  selector: 'app-post-viewer-grid-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    PostViewerCardComponent,
    ShimmerCardComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
  ],
  templateUrl: './post-viewer-grid-wrapper.component.html',
  styleUrls: ['./post-viewer-grid-wrapper.component.scss', './post-viewer-grid-wrapper.sequential.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostViewerGridWrapperComponent implements OnInit, OnDestroy {
  readonly displayKey = this.postViewerActionService.displayKey;
  readonly selectedPostId = this.postViewerActionService.selectedPostId;
  readonly loading = this.postViewerActionService.loadingObs;
  readonly theme$ = this.themeService.theme$;
  readonly favourites$ = this.favouritesService.favourites$;

  private readonly _searchQuery = new BehaviorSubject<string>('');
  private readonly _showFavouritesOnly = new BehaviorSubject<boolean>(false);
  private readonly _sortBy = new BehaviorSubject<string>('createdAt');
  private readonly _sortOrder = new BehaviorSubject<string>('desc');
  private readonly _currentPage = new BehaviorSubject<number>(1);
  private readonly _hasMore = new BehaviorSubject<boolean>(true);
  private readonly _loadingMore = new BehaviorSubject<boolean>(false);

  searchQuery = '';
  showFavouritesOnly = false;
  sortBy = 'createdAt';
  sortOrder = 'desc';

  readonly filteredPostsList: Observable<IPost[]>;
  readonly loadingMore$ = this._loadingMore.asObservable();

  constructor(
    private readonly postViewerActionService: PostViewerActionService,
    private readonly themeService: ThemeService,
    private readonly favouritesService: FavouritesService,
    private readonly dialog: MatDialog,
    private readonly store: Store
  ) {
    this.filteredPostsList = combineLatest([
      this.store.select(selectAllPosts),
      this._searchQuery,
      this._showFavouritesOnly,
      this.favourites$,
      this._sortBy,
      this._sortOrder,
    ]).pipe(
      map(([posts, query, showFavs, favourites, sortBy, sortOrder]) => {
        let filtered = posts;

        // Apply search filter
        if (query.trim()) {
          const lowerQuery = query.trim().toLowerCase();
          filtered = filtered.filter(
            (post) =>
              post.title.toLowerCase().includes(lowerQuery) ||
              post.body.toLowerCase().includes(lowerQuery)
          );
        }

        // Apply favourites filter
        if (showFavs) {
          filtered = filtered.filter((post) => favourites.has(post._id));
        }

        // Apply sorting (create a copy to avoid mutating the original array)
        filtered = [...filtered].sort((a: IPost, b: IPost) => {
          let aValue: any;
          let bValue: any;
          
          switch (sortBy) {
            case 'createdAt':
              aValue = a.createdAt ? new Date(a.createdAt) : new Date();
              bValue = b.createdAt ? new Date(b.createdAt) : new Date();
              break;
            case 'title':
              aValue = a.title.toLowerCase();
              bValue = b.title.toLowerCase();
              break;
            case 'body':
              aValue = a.body.toLowerCase();
              bValue = b.body.toLowerCase();
              break;
            default:
              aValue = a.createdAt ? new Date(a.createdAt) : new Date();
              bValue = b.createdAt ? new Date(b.createdAt) : new Date();
          }
          
          if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });

        return filtered;
      })
    );
  }

  ngOnInit(): void {
    this.postViewerActionService.initialize(); // Initialize with optimized initial load
  }

  onCardClicked(postId: string) {
    this.postViewerActionService.onCardClicked(postId);
  }

  onResetClicked(): void {
    this.postViewerActionService.onResetClicked();
  }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onFavouriteToggled(postId: string): void {
    this.favouritesService.toggleFavourite(postId);
  }

  onSearchChange(query: string): void {
    this._searchQuery.next(query);
    this._currentPage.next(1); // Reset to first page when searching
  }

  onToggleFavouritesFilter(): void {
    this.showFavouritesOnly = !this.showFavouritesOnly;
    this._showFavouritesOnly.next(this.showFavouritesOnly);
    this._currentPage.next(1); // Reset to first page when toggling filter
  }

  onSortChange(sortBy: string): void {
    this.sortBy = sortBy;
    this._sortBy.next(sortBy);
    this._currentPage.next(1); // Reset to first page when changing sort
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this._sortOrder.next(this.sortOrder);
    this._currentPage.next(1); // Reset to first page when changing order
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = element;
    
    // Check if user scrolled near bottom (within 100px)
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      this.loadMorePosts();
    }
  }

  loadMorePosts(): void {
    const currentPage = this._currentPage.value;
    const hasMore = this._hasMore.value;
    
    if (!hasMore || this._loadingMore.value) {
      return;
    }

    this._loadingMore.next(true);
    const nextPage = currentPage + 1;
    
    // Dispatch action to load more posts
    this.store.dispatch(PostActions.loadMorePosts({
      page: nextPage,
      sortBy: this._sortBy.value,
      sortOrder: this._sortOrder.value
    }));
  }

  onAddPost(): void {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((formData: FormData) => {
      if (formData) {
        this.store.dispatch(PostActions.createPost({ post: formData }));
      }
    });
  }

  onEditPost(post: IPost): void {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '500px',
      data: post
    });

    dialogRef.afterClosed().subscribe((formData: FormData) => {
      if (formData) {
        this.store.dispatch(PostActions.updatePost({ postId: post._id, post: formData }));
      }
    });
  }

  ngOnDestroy(): void {
    this.postViewerActionService.onDestroy();
  }
}
