import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: "root",
})
export class MainGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    return this.auth.user.toPromise().then((user) => {
      if (!isNullOrUndefined(user)) {
        return true;
      }
      this.router.navigate(["login"]);
      return false;
    });
  }
}
