import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "../../../../environments";

@Injectable({ providedIn: 'root' })
export class ImageService {
  private baseUrl = 'https://pixabay.com/api/';

  constructor(private http: HttpClient) { }

  getImages(query: string = 'nature') {
    return this.http.get<any>(this.baseUrl, {
      params: {
        key: environment.pixabayApiKey,
        q: query,
        image_type: 'photo',
        per_page: 100
      }
    }).pipe(
      map(res =>
        res.hits
          .slice(0, 20)
          .map((img: any) => img.webformatURL)
      )
    );
  }
}