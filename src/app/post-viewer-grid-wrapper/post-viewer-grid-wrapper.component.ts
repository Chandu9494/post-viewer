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
import { ThemeService } from '../shared/services/theme.service';
import { FavouritesService } from '../shared/services/favourites.service';
import { IPost } from '../shared/post-viewer.interface';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-post-viewer-grid-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    PostViewerCardComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './post-viewer-grid-wrapper.component.html',
  styleUrl: './post-viewer-grid-wrapper.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostViewerGridWrapperComponent implements OnInit, OnDestroy {
  readonly displayKey = this.postViewerActionService.displayKey;
  readonly selectedPostId = this.postViewerActionService.selectedPostIdObs;
  readonly loading = this.postViewerActionService.loadingObs;
  readonly theme$ = this.themeService.theme$;
  readonly favourites$ = this.favouritesService.favourites$;

  private readonly _searchQuery = new BehaviorSubject<string>('');
  private readonly _showFavouritesOnly = new BehaviorSubject<boolean>(false);

  searchQuery = '';
  showFavouritesOnly = false;

  readonly filteredPostsList: Observable<IPost[]>;

  constructor(
    private readonly postViewerActionService: PostViewerActionService,
    private readonly themeService: ThemeService,
    private readonly favouritesService: FavouritesService
  ) {
    this.filteredPostsList = combineLatest([
      this.postViewerActionService.postsList,
      this._searchQuery,
      this._showFavouritesOnly,
      this.favourites$,
    ]).pipe(
      map(([posts, query, showFavs, favourites]) => {
        let filtered = posts;

        if (query.trim()) {
          const lowerQuery = query.trim().toLowerCase();
          filtered = filtered.filter(
            (post) =>
              post.title.toLowerCase().includes(lowerQuery) ||
              post.body.toLowerCase().includes(lowerQuery)
          );
        }

        if (showFavs) {
          filtered = filtered.filter((post) => favourites.has(post.id));
        }

        return filtered;
      })
    );
  }

  ngOnInit(): void {
    this.postViewerActionService.initialize();
  }

  onCardClicked(postId: number) {
    this.postViewerActionService.onCardClicked(postId);
  }

  onResetClicked(): void {
    this.postViewerActionService.onResetClicked();
  }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onFavouriteToggled(postId: number): void {
    this.favouritesService.toggleFavourite(postId);
  }

  onSearchChange(query: string): void {
    this._searchQuery.next(query);
  }

  onToggleFavouritesFilter(): void {
    this.showFavouritesOnly = !this.showFavouritesOnly;
    this._showFavouritesOnly.next(this.showFavouritesOnly);
  }

  ngOnDestroy(): void {
    this.postViewerActionService.onDestroy();
  }
}
