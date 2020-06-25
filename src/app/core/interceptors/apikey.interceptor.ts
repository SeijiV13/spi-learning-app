import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const token = localStorage.getItem('userk');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Apisecret ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });
        }

        return next.handle(request);
    }
}
