import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    return this.auth.user.toPromise().then(user => {
      console.log(user);
      if (!isNullOrUndefined(user)) {
        return true;
      }
      this.router.navigate(["main"]);
      return false;
    })
  }
}
