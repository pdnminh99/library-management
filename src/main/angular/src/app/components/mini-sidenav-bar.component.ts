import {Component} from '@angular/core';
import {NavigationService} from '../authentication/navigation.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mini-sidenav-component',
  template: `
    <div>
      <mat-toolbar style="background-color: transparent;">
        <mat-toolbar-row *ngFor="let nav of navigationService.sideNavButtons" class="mini-sidenav-toolbar">
          <mini-sidenav-btn-component
            [isActive]="nav.isActive"
            [icon]="nav.icon"
            (click)="navigationService.navigate(nav)"
          ></mini-sidenav-btn-component>
        </mat-toolbar-row>
      </mat-toolbar>
    </div>
  `,
  styles: [
      `
      .mini-sidenav-toolbar {
        padding: 0 0;
      }
    `,
  ],
})
export class MiniSideNavigationComponent {

  constructor(public navigationService: NavigationService, public router: Router) {
  }

}
