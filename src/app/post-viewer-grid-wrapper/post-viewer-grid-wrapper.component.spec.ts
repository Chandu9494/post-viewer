import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostViewerGridWrapperComponent } from './post-viewer-grid-wrapper.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PostViewerApiService } from './services/post-viewer-api.service';
import { of } from 'rxjs';
import { IPost } from '../shared/post-viewer.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PostViewerCardComponent } from '../post-viewer-card/post-viewer-card.component';
import * as postSelectors from '../store/posts.selectors';
import { getPosts } from '../store/posts.action';
import { PostViewerActionService } from './services/post-viewer-action.service';

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

describe('#PostViewerGridWrapperComponent', () => {
  let component: PostViewerGridWrapperComponent;
  let fixture: ComponentFixture<PostViewerGridWrapperComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostViewerGridWrapperComponent,
        CommonModule,
        MatCardModule,
        MatDividerModule,
        PostViewerCardComponent,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: postSelectors.selectAllPosts, value: mockPosts },
            { selector: postSelectors.selectPropertyKeyMap, value: mockKeyMap },
          ],
        }),
        {
          provide: PostViewerApiService,
          useValue: {
            getPosts: () => of(mockPosts),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PostViewerGridWrapperComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load postsList from store', (done) => {
    component.postsList.subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
      done();
    });
  });

  it('should initialize', (done) => {
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(getPosts());
    component.postsList.subscribe((posts) => {
      expect(posts.length).toEqual(2);
      done();
    });
  });

  it('should update selectedPostId on card click', (done) => {
    component.onCardClicked(2);
    component.selectedPostId.subscribe((id) => {
      expect(id).toBe(2);
      done();
    });
  });

  it('should update displayKey on card click', (done) => {
    component.onCardClicked(5);
    component.displayKey.subscribe((key) => {
      expect(key).toBe('title');
      done();
    });
  });

  it('should destroy', () => {
    const postViewerActionService = TestBed.inject(PostViewerActionService);
    spyOn(postViewerActionService, 'onDestroy');
    component.ngOnDestroy();
    expect(postViewerActionService.onDestroy).toHaveBeenCalled();
  });

  it('should reset selection on click of the reset button', (done) => {
    const postViewerActionService = TestBed.inject(PostViewerActionService);
    spyOn(postViewerActionService, 'onResetClicked');
    component.onResetClicked();
    expect(postViewerActionService.onResetClicked).toHaveBeenCalled();
    component.displayKey.subscribe((key) => {
      expect(key).toBe('title');
      done();
    });
  });
});
