import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map} from 'rxjs/operators';

import {Observable} from 'rxjs';
import { AdvertiserService } from './advertiser.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertiserResolver implements Resolve<any> {
  constructor(public router: Router, public advertiserService: AdvertiserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.advertiserService.get(route.params.id).pipe(
      catchError(() => this.router.navigate(['camps/advertisers']))
    );
  }
}
