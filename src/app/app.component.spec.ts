import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PostViewerActionService } from './post-viewer-grid-wrapper/services/post-viewer-action.service';
import { PostViewerApiService } from './post-viewer-grid-wrapper/services/post-viewer-api.service';
import { IPost } from './shared/post-viewer.interface';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import * as postSelectors from '../app/store/posts.selectors';

describe('AppComponent', () => {
  const mockPosts: IPost[] = [
    {
      id: 1,
      title: 'Post 1',
      body: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua. Ut enim ad minim veniam,',
      userId: '134',
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
      userId: '243',
    },
  ];

  const mockKeyMap = {
    1: 'title',
    2: 'body',
    3: 'userId',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        PostViewerActionService,
        {
          provide: PostViewerApiService,
          useValue: {
            getPosts: () => of(mockPosts),
          },
        },
        provideMockStore({
          selectors: [
            { selector: postSelectors.selectAllPosts, value: mockPosts },
            { selector: postSelectors.selectPropertyKeyMap, value: mockKeyMap },
          ],
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'post-viewer' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('post-viewer');
  });
});
