import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

constructor(private http: HttpClient) { }
  lessons = new Subject<any>();
  selectLesson = new Subject<any>();
  restartVideoPage = new Subject<any>();
  getCourses() {
    return this.http.get(`${environment.url}/vdo/videos`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

  getCourseGroup(courses) {
    return this.http.post(`${environment.url}/vdo/courses`, { courses}).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

  getUserCourse(id: string) {
    return this.http.get(`${environment.url}/user/${id}`, {}).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

  getVdoOtp(id: string) {
    return this.http.post(`${environment.url}/vdo/otp`, {id,
      annotate: "[{'type':'image', 'url' : 'https://spi.ph/wp-content/uploads/2019/03/logo.png', 'x' : '10','y' : '100'}]"
    }).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

  getVdoShareOtp(id: string, apikey) {
    return this.http.post(`${environment.url}/vdo/share/otp`, {id, apikey,
      annotate: "[{'type':'image', 'url' : 'https://spi.ph/wp-content/uploads/2019/03/logo.png', 'x' : '10','y' : '100'}]"
    }).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }
}
