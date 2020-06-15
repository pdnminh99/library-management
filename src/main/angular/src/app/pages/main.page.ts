import {Component} from '@angular/core';
import {SearchService} from '../authentication/search.service';
import {NavigationService} from '../authentication/navigation.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-page',
  template: `
    <mat-sidenav-container class="container">
      <mat-sidenav #sidenav mode="over" class="sidenav">
        <h1 class="sivenav-title">
          Navigation
        </h1>
        <hr/>

        <navigation-button-component
          *ngFor="let nav of navigationService.sideNavButtons"
          [routerLink]="nav.navigation"
          [icon]="nav.icon"
          [isActive]="nav.isActive"
          [title]="nav.navigation"
        ></navigation-button-component>
      </mat-sidenav>
      <mat-sidenav-content style="display: flex; flex-flow: column; justify-content: flex-start;">
        <navigation-component
          (onMenuButtonClicked)="sidenav.toggle()"
        ></navigation-component>

        <mat-sidenav-container
          style="height: 100%; background-color: transparent;"
        >
          <mat-sidenav
            id="mini-sidenav"
            mode="side"
            [opened]="true"
            style="background-color: transparent; border: none;"
          >
            <mini-sidenav-component></mini-sidenav-component>
          </mat-sidenav>
          <mat-sidenav-content style="padding: 20px;">
            <router-outlet *ngIf="!isSearchActive"></router-outlet>
            <search-page *ngIf="isSearchActive"></search-page>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
      `
      .container {
        height: 100%;
        width: 100%;
      }

      .sivenav-title {
        padding-left: 20px;
        font-size: 30px;
        font-weight: bold;
        color: #236ed4;
      }

      .sidenav {
        border-radius: 7px;
        margin-top: 20px;
        margin-left: 15px;
        margin-bottom: 20px;
        padding-top: 30px;
        padding-left: 0;
      }

      @media screen and (max-width: 1024px) {
        #mini-sidenav {
          display: none;
        }
      }
    `,
  ],
})
// tslint:disable-next-line:component-class-suffix
export class MainPage {
  public get isSearchActive(): boolean {
    return this.searchService.isSearchActive;
  }

  constructor(private searchService: SearchService, public navigationService: NavigationService) {
  }
}
