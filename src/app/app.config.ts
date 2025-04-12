import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { postsReducer } from './store/posts.reducer';
import { provideEffects } from '@ngrx/effects';
import { PostsEffects } from './store/posts.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({ posts: postsReducer }),
    provideEffects([PostsEffects]),
    provideHttpClient(),
  ],
};
