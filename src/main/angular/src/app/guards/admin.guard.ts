import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";
import { UserType } from "../models/Model";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let allow = this.authService.isCurrentUserMatch(UserType.ADMIN);
    if (!allow) {
      this.router.navigate(["dashboard"]).then((_) => {});
    }
    return allow;
  }
}
