import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VideoService {
watchVideoEmitter = new EventEmitter();
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

  getUserWatchedVideos(id: string) {
    return this.http.get(`${environment.url}/user/watched/${id}`, {}).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

  getVdoOtp(id: string) {
    return this.http.post(`${environment.url}/vdo/otp`, {id,
      annotate: `[{'type':'rtext', 'text':'Spi Connect', 'alpha':'0.8', 'color':'0xFFFFFF','size':'15','interval':'5000'}
        ,{'type':'image', 'url':'${location.origin}/assets/images/spi-logo.png', 'x':'30', 'y':'50'}]`
    }).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

  getVdoShareOtp(id: string, apikey) {
    return this.http.post(`${environment.url}/vdo/share/otp`, {id, apikey,
      annotate: `[{'type':'rtext', 'text':'Spi Connect', 'alpha':'0.8', 'color':'0xFFFFFF','size':'15','interval':'5000'}
      ,{'type':'image', 'url':'${location.origin}/assets/images/spi-logo.png', 'x':'30', 'y':'50'}]`
    }).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

  updateWatchedVideos(id, videoid) {
    return this.http.put(`${environment.url}/user/watched/${id}`, {videoid
    }).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

  updateTotalVideos(id, totalVideos) {
    return this.http.put(`${environment.url}/user/total/${id}`, {totalVideos
    }).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

  checkShareVideoAccess(token) {
    return this.http.get(`${environment.url}/authshare/${token}`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

}
