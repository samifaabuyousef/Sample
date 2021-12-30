import {Injectable} from '@angular/core';
import {of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) {
  }

  login(credential: any) {
    return this.http.post('/api/oauth', credential);
    /*if(credential.username == 'admin' && credential.password == '123456') {
      const user = {name: 'user 1'};
      this.localLogin(user);
      return of(user);
    }

    return throwError({message: 'bla bla'});*/
  }

  whoami() {
    return this.http.get('/api/customer/who-am-i');
  }

  logout() {
    this.localLogout();
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') == '1';
  }

  private localLogin(user) {
    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('user', JSON.stringify(user));
  }

  private localLogout() {
    localStorage.clear();
  }

  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
