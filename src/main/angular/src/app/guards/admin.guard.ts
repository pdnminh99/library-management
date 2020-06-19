import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserType} from '../models/Model';
import {Observable} from 'rxjs';
  
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated();
    // console.log('Activating Guard!');
    // return this.authService.isCurrentUserMatch(UserType.ADMIN)
    //   .then((result: boolean) => {
    //     if (!result) {
    //       console.log('Result is false! attempt to navigate to `Dashboard`.');
    //       this.router.navigate(['dashboard']).then(r => {
    //       });
    //       return false;
    //     }
    //     return true;
    //   });
  }
}
