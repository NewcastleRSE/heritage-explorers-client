
import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRoute, RouterStateSnapshot} from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor(public router: Router) {}

  // @ts-ignore
  canActivate(route: ActivatedRoute, state: RouterStateSnapshot): boolean {

    if (!this.isLoggedIn()) {
      this.router.navigate(['signin'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
    return true;
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
