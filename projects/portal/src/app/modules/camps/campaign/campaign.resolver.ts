import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map} from 'rxjs/operators';

import {Observable} from 'rxjs';
import {CampaignService} from './campaign.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignResolver implements Resolve<any> {
  constructor(public router: Router, public campaignService: CampaignService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.campaignService.get(route.params.id).pipe(
      catchError(() => this.router.navigate(['dums']))
    );
  }
}
