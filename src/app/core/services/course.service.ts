import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get(`${environment.url}/course`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }


}
