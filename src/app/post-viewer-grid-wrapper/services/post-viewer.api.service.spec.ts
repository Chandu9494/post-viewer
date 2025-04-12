import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PostViewerApiService } from './post-viewer-api.service';
import { IPost } from '../../shared/post-viewer.interface';
import {
  HttpClient,
  HttpHandler,
  provideHttpClient,
} from '@angular/common/http';

describe('PostViewerApiService', () => {
  let service: PostViewerApiService;
  let httpMock: HttpTestingController;

  const mockPosts: IPost[] = [
    { id: 1, title: 'Post 1', body: 'Body 1', userId: '1' },
    { id: 2, title: 'Post 2', body: 'Body 2', userId: '2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostViewerApiService,
        HttpTestingController,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(PostViewerApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts via GET', () => {
    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne('http://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });
});
