import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(public injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe( tap(() => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.injector.get(AuthenticationService).logout().subscribe();
          }
        }));
  }
}