import {Injectable} from '@angular/core';
import {SideNavigation, UserType} from '../models/Model';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';


@Injectable({providedIn: 'root'})
export class NavigationService {

  // tslint:disable-next-line:variable-name
  public _sideNavButtons: SideNavigation[] = [{
    id: 0,
    navigation: 'dashboard',
    icon: 'apps',
    isActive: false
  }, {
    id: 1,
    navigation: 'resources',
    icon: 'menu_book',
    isActive: true
  }, {
    id: 2,
    navigation: 'members',
    icon: 'people',
    isActive: false
  }, {
    id: 3,
    navigation: 'account',
    icon: 'person',
    isActive: false
  }];

  public get sideNavButtons(): SideNavigation[] {
    if (this.auth.currentUser === undefined || this.auth.currentUser === null) {
      return [this._sideNavButtons[0]];
    }
    switch (this.auth.currentUser.type) {
      case UserType.ADMIN:
        return this._sideNavButtons;
      case UserType.MEMBER:
      case UserType.GUEST:
      default:
        return [this._sideNavButtons[0], this._sideNavButtons[3]];
    }
  }

  constructor(public auth: AuthenticationService, public router: Router) {
    this.router.events.subscribe(value => {
      const route = location.pathname.split('/');
      // tslint:disable-next-line:forin
      for (const index in this._sideNavButtons) {
        this._sideNavButtons[index].isActive = this._sideNavButtons[index].navigation === route[1];
      }
    });
  }

  // public navigate(navigation: SideNavigation) {
  //   // tslint:disable-next-line:forin
  //   for (const index in this.sideNavButtons) {
  //     this.sideNavButtons[index].isActive = false;
  //   }
  //   this.router.navigate([navigation.navigation]).then(r => this.sideNavButtons[navigation.id].isActive = true);
  // }

}
