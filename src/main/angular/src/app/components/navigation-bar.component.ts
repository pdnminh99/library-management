import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";
import { SearchService } from "../authentication/search.service";
import { UserType } from "../models/Model";
import { MatDialog } from "@angular/material/dialog";
import { LoginCardComponent } from "./login-card.component";

@Component({
  selector: "navigation-component",
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

      <div
        style="flex: 1; margin-right: 10px; display: flex; justify-content: flex-end; align-items: center;"
      >
        <button
          *ngIf="displaySignInButton"
          mat-raised-button
          (click)="signIn()"
        >
          Sign in
        </button>

        <mat-chip-list style="margin-right: 5px;">
          <mat-chip *ngIf="isMember">Member</mat-chip>
          <mat-chip *ngIf="isAdmin" color="warn" selected>Admin</mat-chip>
        </mat-chip-list>
        <button
          *ngIf="!displaySignInButton"
          mat-icon-button
          color="primary"
          [matMenuTriggerFor]="menu"
        >
          <img
            *ngIf="this.auth.currentUser !== undefined"
            [src]="displayImage"
            [alt]="displayImage"
            (error)="this.isImageFailed = true"
            style="width: 40px; border-radius: 50px;"
          />
        </button>
      </div>

      <mat-menu #menu="matMenu">
        <div
          style="padding: 10px; text-align: center;"
          *ngIf="auth.currentUser !== undefined"
        >
          <img
            style="width: 50%; border-radius: 100px; margin-bottom: 5px;"
            [src]="displayImage"
            [alt]="displayImage"
            (error)="isImageFailed = true"
          />
          <div style="font-weight: bolder; font-size: 20px;">
            {{ auth.currentUser?.displayName }}
          </div>
          <div style="font-size: 14px;">
            {{ auth.currentUser?.email }}
          </div>
        </div>

        <hr />

        <button routerLink="account" style="text-align: center" mat-menu-item>
          Account
        </button>
        <button style="text-align: center;" (click)="signOut()" mat-menu-item>
          Sign Out
        </button>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      #sign-out-mini-btn {
        background-color: #e5a3a3;
      }

      ::ng-deep .mat-menu-panel {
        margin-top: 10px;
        padding: 0;
      }

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

  public isImageFailed = false;

  public get displayImage(): string {
    return this.isImageFailed
      ? "https://thumbs.dreamstime.com/b/black-linear-photo-camera-logo-like-no-image-available-black-linear-photo-camera-logo-like-no-image-available-flat-stroke-style-106031126.jpg"
      : this.auth.currentUser?.photoURL ?? "";
  }

  public get displaySignInButton(): boolean {
    return !this.auth.isLoggedIn;
  }

  public get isMember(): boolean {
    return this.auth.currentUser?.type === UserType.MEMBER;
  }

  public get isAdmin(): boolean {
    return this.auth.currentUser?.type === UserType.ADMIN;
  }

  public valueChange(newValue: string): void {
    this.searchService.value = newValue;
  }

  public handleMenuButtonClicked(): void {
    this.onMenuButtonClicked.emit();
  }

  public signIn(): void {
    const dialogRef = this.dialog.open(LoginCardComponent);
    dialogRef.afterClosed().subscribe((v) => {});
    // this.auth.signIn();
  }

  public signOut(): void {
    this.auth.signOut();
  }

  constructor(
    public auth: AuthenticationService,
    private searchService: SearchService,
    public dialog: MatDialog
  ) {}
}
