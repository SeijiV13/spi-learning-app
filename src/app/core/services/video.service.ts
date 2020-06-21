import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VideoService {

constructor(private http: HttpClient) { }

  getVideos() {
    return this.http.get('/videos', {}).pipe(
      map((data) => data),
      catchError(error => throwError(error))
    );
  }

  getVideo(id: string) {
    return this.http.get('/video', {}).pipe(
      map((data) => data),
      catchError(error => throwError(error))
    );
  }
}
