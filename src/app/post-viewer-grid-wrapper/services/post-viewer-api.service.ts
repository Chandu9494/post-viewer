import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../shared/post-viewer.interface';

@Injectable({ providedIn: 'root' })
export class PostViewerApiService {
  readonly baseUrl = 'http://localhost:3001/api/posts';

  constructor(private readonly httpClient: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(this.baseUrl);
  }

  addPost(post: FormData): Observable<IPost> {
    return this.httpClient.post<IPost>(this.baseUrl, post);
  }

  updatePost(id: string, post: FormData): Observable<IPost> {
    return this.httpClient.put<IPost>(`${this.baseUrl}/${id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
