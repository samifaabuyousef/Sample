import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthService, PUBLIC_FALLBACK_PAGE_URI} from 'ngx-auth';

import {TokenStorage} from './token-storage.service';
import {AUTH, CSRF, getApiName, LOGOUT, PROFILE} from '../../../../apiMap';
import {environment} from '../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

interface AccessData {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthenticationService implements AuthService {

  private static interruptedUrl: string;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private toastr: ToastrService,
    private router: Router,
    @Inject(PUBLIC_FALLBACK_PAGE_URI) private publicFallbackPageUri: string,
  ) {
  }

  public isAuthorized(): Observable<boolean> {
    return this.tokenStorage
      .getAccessToken()
      .pipe(map(token => !!token));
  }

  public getAccessToken(): Observable<string> {
    return this.tokenStorage.getAccessToken();
  }

  public refreshToken(): Observable<AccessData> {
    return this.tokenStorage
      .getRefreshToken()
      .pipe(
        switchMap((refreshToken: string) =>
          this.http.post(`${getApiName(AUTH)}`, {
            refresh_token: refreshToken,
            client_id: environment.clientId,
            client_secret: environment.clientSecret,
            grant_type: 'refresh_token'
          })
        ),
        map((res: any) => this.mapTokens(res)),
        tap((tokens: AccessData) => this.saveAccessData(tokens)),
        catchError((err) => {
          if (err.error.hint === 'Token has expired') {
            this.toastr.error('Session expired');
            this.logout();
          }
          return throwError(err);
        })
      );
  }

  public verifyTokenRequest(url: string): boolean {
    return false;
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return false;
  }

  public csrf() {
    return this.http.get(`${getApiName(CSRF)}`);
  }

  public login(credential): Observable<any> {
    return this.http.post(`${getApiName(AUTH)}`, {
      // client_id: environment.clientId,
      // client_secret: environment.clientSecret,
      // grant_type: 'password',
      username: credential.username,
      password: credential.password
    })
      .pipe(
        // map((res: any) => this.mapTokens(res)),
        // tap((tokens: AccessData) => this.saveAccessData(tokens))
          tap(() => this.saveFakeAccessData())
      );
  }

  public getUserProfile(): Observable<any> {
    return this.http.get(`${getApiName(PROFILE)}`);

    //   return of({
    //     "id": 222732,
    //     "username": "pfizer",
    //     "full_name": "",
    //     "first_name": null,
    //     "last_name": null,
    //     "permissions": [
    //         "User Managements",
    //         "Campaign analytics",
    //         "Deployment_Management",
    //         'POC_Administration'
    //     ]
    // })

  }

  public logout() {
    return this.http.post(`${getApiName(LOGOUT)}`, {})
        .pipe(
            tap(() => this.performLogout(), e => this.performLogout()),
    );
  }

  private performLogout() {
    this.tokenStorage.clear();
    localStorage.clear();
    this.router.navigate([this.publicFallbackPageUri]);
  }

  private saveAccessData({accessToken, refreshToken}: AccessData) {
    this.tokenStorage
      .setAccessToken(accessToken)
      .setRefreshToken(refreshToken);
  }

  private saveFakeAccessData() {
    this.tokenStorage
        .setAccessToken('1')
        .setRefreshToken('1');
  }

  private mapTokens(response) {
    return {accessToken: response.access_token, refreshToken: response.refresh_token};
  }

  public getInterruptedUrl(): string {
    const url = AuthenticationService.interruptedUrl;
    AuthenticationService.interruptedUrl = null;
    return url;
  }

  public setInterruptedUrl(url: string): void {
    AuthenticationService.interruptedUrl = url;
  }

  public getHeaders() {
    return {};
  }
}
