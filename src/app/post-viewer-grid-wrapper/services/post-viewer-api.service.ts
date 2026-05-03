import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../shared/post-viewer.interface';

@Injectable({ providedIn: 'root' })
export class PostViewerApiService {
  readonly baseUrl = 'http://localhost:3001/api/posts';

  constructor(private readonly httpClient: HttpClient) {}

  getPosts(options?: { initial?: boolean; page?: number; sortBy?: string; sortOrder?: string }): Observable<IPost[]> {
    const params = new URLSearchParams();
    
    if (options?.initial) {
      params.append('initial', 'true');
    }
    if (options?.page) {
      params.append('page', options.page.toString());
    }
    if (options?.sortBy) {
      params.append('sortBy', options.sortBy);
    }
    if (options?.sortOrder) {
      params.append('sortOrder', options.sortOrder);
    }
    
    const url = params.toString() ? `${this.baseUrl}?${params}` : this.baseUrl;
    return this.httpClient.get<IPost[]>(url);
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
