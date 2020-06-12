import {Component, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {SearchService} from '../authentication/search.service';
import {isNullOrUndefined} from 'util';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navigation-component',
  template: `
    <div class="nav">
      <navigation-control-component
        title="Athene"
        style="flex: 1;"
        (onMenuButtonClicked)="handleMenuButtonClicked()"
      ></navigation-control-component>

      <search-bar-component
        id="search-bar"
        [borderRadius]="7"
        (onValueChange)="valueChange($event)"
      ></search-bar-component>

      <div style="flex: 1; text-align: right;">
        <button
          *ngIf="displaySignInButton"
          mat-raised-button
          (click)="signIn()"
        >
          Sign in
        </button>

        <button *ngIf="!displaySignInButton" mat-icon-button color="primary" [matMenuTriggerFor]="menu">
          <img
            [src]="photoUrl"
            style="width: 40px; border-radius: 50px;">
        </button>
      </div>

      <mat-menu #menu="matMenu">
        <div style="font-weight: bolder; font-size: 20px;">
          {{ auth?.currentUser?.displayName }}
        </div>
        <div style="font-size: 14px;">
          {{ auth?.currentUser?.email }}
        </div>
        <button mat-menu-item style="background-color: blue; color: #fff;">
          Account
        </button>
        <button
          (click)="signOut()"
          mat-menu-item
          style="background-color: red; color: #fff;"
        >
          Sign Out
        </button>
      </mat-menu>
    </div>
  `,
  styles: [
      `
      #search-bar {
        flex: 2;
      }

      @media screen and (max-width: 600px) {
        #search-bar {
          display: none;
        }
      }

      .nav {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: transparent;
      }
    `,
  ],
})
export class NavigationComponent {
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  private onMenuButtonClicked = new EventEmitter<void>();

  public get displaySignInButton(): boolean {
    return !this.auth.isLoggedIn;
  }

  public get photoUrl(): string {
    if (isNullOrUndefined(this.auth.currentUser)) {
      return '';
    }
    return this.auth.currentUser.photoURL;
  }

  public valueChange(newValue: string): void {
    this.searchService.value = newValue;
  }

  public handleMenuButtonClicked(): void {
    this.onMenuButtonClicked.emit();
  }

  public signIn(): void {
    this.auth.signIn();
  }

  public signOut(): void {
    this.auth.signOut();
  }

  constructor(
    public auth: AuthenticationService,
    private searchService: SearchService
  ) {
  }
}
