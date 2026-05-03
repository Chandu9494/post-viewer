import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IslandHydrationService {
  private hydrationState = new BehaviorSubject<Map<string, boolean>>(new Map());
  readonly hydrationState$ = this.hydrationState.asObservable();

  hydrateIsland(islandId: string, delay: number = 0): void {
    setTimeout(() => {
      const currentState = this.hydrationState.value;
      currentState.set(islandId, true);
      this.hydrationState.next(new Map(currentState));
    }, delay);
  }

  isHydrated(islandId: string): boolean {
    return this.hydrationState.value.get(islandId) || false;
  }

  // Progressive hydration strategy
  hydrateWithPriority(islands: Array<{ id: string; priority: number }>): void {
    islands
      .sort((a, b) => a.priority - b.priority)
      .forEach(({ id, priority }) => {
        this.hydrateIsland(id, priority * 100);
      });
  }
}
