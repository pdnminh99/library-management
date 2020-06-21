import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable({
  providedIn: "root",
})
export class MemberGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ): boolean {
    let allow = this.authenticationService.isLoggedIn;
    if (!allow) {
      this.router.navigate(["dashboard"]).then((_) => {});
    }
    return allow;
  }
}
