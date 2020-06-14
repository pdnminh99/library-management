import {Injectable} from '@angular/core';
import {SideNavigation, UserType} from '../models/Model';
import {ActivatedRoute, Router} from '@angular/router';
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
    navigation: 'loans',
    icon: 'assignments',
    isActive: false
  }, {
    id: 4,
    navigation: 'account',
    icon: 'person',
    isActive: false
  }];

  public get sideNavButtons(): SideNavigation[] {
    if (this.auth.currentUser === undefined) {
      return [{
        id: 0,
        navigation: 'dashboard',
        icon: 'apps',
        isActive: false
      }, {
        id: 1,
        navigation: 'account',
        icon: 'person',
        isActive: false
      }];
    }
    switch (this.auth.currentUser.type) {
      case UserType.ADMIN:
        return this._sideNavButtons;
      case UserType.MEMBER:
      case UserType.GUEST:
      default:
        return [{
          id: 0,
          navigation: 'dashboard',
          icon: 'apps',
          isActive: false
        }, {
          id: 1,
          navigation: 'account',
          icon: 'person',
          isActive: false
        }];
    }
  }

  constructor(public auth: AuthenticationService, public router: Router) {
  }

  public navigate(navigation: SideNavigation) {
    // tslint:disable-next-line:forin
    for (const index in this.sideNavButtons) {
      this.sideNavButtons[index].isActive = false;
    }
    this.router.navigate([navigation.navigation]).then(r => this.sideNavButtons[navigation.id].isActive = true);
  }

}
