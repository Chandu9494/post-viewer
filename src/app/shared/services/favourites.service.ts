import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private static readonly STORAGE_KEY = 'post-viewer-favourites';
  private readonly _favourites = new BehaviorSubject<Set<string>>(
    this.loadFromStorage()
  );

  readonly favourites$: Observable<Set<string>> = this._favourites.asObservable();

  isFavourite(postId: string): boolean {
    return this._favourites.value.has(postId);
  }

  toggleFavourite(postId: string): void {
    const current = new Set(this._favourites.value);
    if (current.has(postId)) {
      current.delete(postId);
    } else {
      current.add(postId);
    }
    this._favourites.next(current);
    this.saveToStorage(current);
  }

  private loadFromStorage(): Set<string> {
    try {
      const stored = localStorage.getItem(FavouritesService.STORAGE_KEY);
      if (stored) {
        return new Set<string>(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    return new Set<string>();
  }

  private saveToStorage(favourites: Set<string>): void {
    localStorage.setItem(
      FavouritesService.STORAGE_KEY,
      JSON.stringify([...favourites])
    );
  }
}
