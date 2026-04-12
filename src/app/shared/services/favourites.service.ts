import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private static readonly STORAGE_KEY = 'post-viewer-favourites';
  private readonly _favourites = new BehaviorSubject<Set<number>>(
    this.loadFromStorage()
  );

  readonly favourites$: Observable<Set<number>> = this._favourites.asObservable();

  isFavourite(postId: number): boolean {
    return this._favourites.value.has(postId);
  }

  toggleFavourite(postId: number): void {
    const current = new Set(this._favourites.value);
    if (current.has(postId)) {
      current.delete(postId);
    } else {
      current.add(postId);
    }
    this._favourites.next(current);
    this.saveToStorage(current);
  }

  private loadFromStorage(): Set<number> {
    try {
      const stored = localStorage.getItem(FavouritesService.STORAGE_KEY);
      if (stored) {
        return new Set<number>(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    return new Set<number>();
  }

  private saveToStorage(favourites: Set<number>): void {
    localStorage.setItem(
      FavouritesService.STORAGE_KEY,
      JSON.stringify([...favourites])
    );
  }
}
