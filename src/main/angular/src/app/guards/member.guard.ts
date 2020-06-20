import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class MemberGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {
  }

  canActivate(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ): boolean {
    return this.authenticationService.isLoggedIn;
  }
}
