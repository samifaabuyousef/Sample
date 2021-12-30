import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SimpleCrypt} from 'ngx-simple-crypt';
import {environment} from '../../../../environments/environment';

@Injectable()
export class TokenStorage {

  crypt = new SimpleCrypt();

  public getAccessToken(): Observable<string> {
    const token: string = localStorage.getItem('at') as string;

    return of(this.crypt.decode(environment.EncKey, token || ''));
  }

  public getAccessTokenStr(): string {
    const token: string = localStorage.getItem('at') as string;

    return this.crypt.decode(environment.EncKey, token || '');
  }

  public getRefreshToken(): Observable<string> {
    const token: string = localStorage.getItem('rt') as string;

    return of(this.crypt.decode(environment.EncKey, token || ''));
  }

  public getRefreshTokenStr(): string {
    const token: string = localStorage.getItem('rt') as string;

    return this.crypt.decode(environment.EncKey, token || '');
  }

  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('at', this.crypt.encode(environment.EncKey, token || ''));

    return this;
  }

  public setRefreshToken(token: string): TokenStorage {
    if (typeof (token) !== 'undefined') {
      let tt = this.crypt.encode(environment.EncKey, token || '');
      tt = this.crypt.decode(environment.EncKey, tt || '');
      localStorage.setItem('rt', this.crypt.encode(environment.EncKey, token || ''));
    }

    return this;
  }

  public clear() {
    localStorage.removeItem('at');
    localStorage.removeItem('rt');
  }
}
