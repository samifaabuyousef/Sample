import { Injectable, Injector } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, first, map, switchMap } from "rxjs/operators";
import { AUTH_SERVICE, AuthService } from "ngx-auth";
import { PortalMenuService } from "../services/portal-menu.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshInProgress = false;

  private refreshSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private injector: Injector,
    private portalService: PortalMenuService
  ) {}

  public intercept(
    req: HttpRequest<any>,
    delegate: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.skipRequest(req)) {
      return delegate.handle(req);
    }
    return this.processIntercept(req, delegate);
  }

  private processIntercept(
    original: HttpRequest<any>,
    delegate: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clone: HttpRequest<any> = original.clone();

    return this.request(clone).pipe(
      switchMap((req: HttpRequest<any>) => delegate.handle(req)),
      catchError((res: HttpErrorResponse) => this.responseError(clone, res))
    );
  }

  private request(req: HttpRequest<any>): Observable<HttpRequest<any>> {
    if (this.refreshInProgress) {
      return this.delayRequest(req);
    }

    return this.addToken(req);
  }

  private responseError(
    req: HttpRequest<any>,
    res: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    const authService: AuthService =
      this.injector.get<AuthService>(AUTH_SERVICE);
    const refreshShouldHappen: boolean = authService.refreshShouldHappen(res);

    if (refreshShouldHappen && !this.refreshInProgress) {
      this.refreshInProgress = true;

      this.portalService.getPerssionOnHeader();
      authService.refreshToken().subscribe(
        () => {
          this.portalService.getPerssionOnHeader();
          this.refreshInProgress = false;
          this.refreshSubject.next(true);
        },
        () => {
          this.portalService.getPerssionOnHeader();
          this.refreshInProgress = false;
          this.refreshSubject.next(false);
        }
      );
    }

    if (refreshShouldHappen && this.refreshInProgress) {
      return this.retryRequest(req, res);
    }

    return throwError(res);
  }

  private addToken(req: HttpRequest<any>): Observable<HttpRequest<any>> {
    const authService: AuthService =
      this.injector.get<AuthService>(AUTH_SERVICE);

    return authService.getAccessToken().pipe(
      map((token: string) => {
        if (token) {
          let setHeaders: { [name: string]: string | string[] };

          if (typeof authService.getHeaders === "function") {
            setHeaders = authService.getHeaders(token);
          } else {
            setHeaders = { Authorization: `Bearer ${token}` };
          }

          return req.clone({ setHeaders });
        }

        return req;
      }),
      first()
    );
  }

  private delayRequest(req: HttpRequest<any>): Observable<HttpRequest<any>> {
    return this.refreshSubject.pipe(
      first(),
      switchMap((status: boolean) =>
        status ? this.addToken(req) : throwError(req)
      )
    );
  }

  private retryRequest(
    req: HttpRequest<any>,
    res: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    const http: HttpClient = this.injector.get<HttpClient>(HttpClient);

    return this.refreshSubject.pipe(
      first(),
      switchMap((status: boolean) =>
        status ? http.request(req) : throwError(res || req)
      )
    );
  }

  private skipRequest(req: HttpRequest<any>) {
    const skipRequest = this.exec("skipRequest", req);
    const verifyRefreshToken = this.exec("verifyRefreshToken", req);

    // deprecated, will be removed soon
    const verifyTokenRequest = this.exec("verifyTokenRequest", req.url);

    return skipRequest || verifyRefreshToken || verifyTokenRequest;
  }

  private exec(method: string, ...args: any[]) {
    const authService: AuthService =
      this.injector.get<AuthService>(AUTH_SERVICE);

    if (typeof authService[method] === "function") {
      return authService[method](...args);
    }
  }
}
