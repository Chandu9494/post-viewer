import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../shared/post-viewer.interface';

@Injectable({ providedIn: 'root' })
export class PostViewerApiService {
  private readonly url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private readonly httpClient: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(this.url);
  }
}
