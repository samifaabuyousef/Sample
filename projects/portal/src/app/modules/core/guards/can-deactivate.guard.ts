import {Injectable} from '@angular/core';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {HostListener} from '@angular/core';

export abstract class ComponentCanDeactivate {

  abstract canDeactivate(): boolean;


  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean {

    if (!component.canDeactivate()) {
      if (confirm('Changes you made may not be saved.')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
