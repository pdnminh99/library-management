import { Component, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";
import { SearchService } from "../authentication/search.service";
import { isNullOrUndefined } from "util";

@Component({
  selector: "navigation-component",
  template: `
    <div class="nav">
      <navigation-control-component
        class="nav-component"
        title="Athene"
        (onMenuButtonClicked)="handleMenuButtonClicked()"
      ></navigation-control-component>

      <search-bar-component
        class="nav-component"
        [width]="700"
        [height]="50"
        [borderRadius]="7"
        (onValueChange)="valueChange($event)"
      ></search-bar-component>

      <div class="nav-component">
        <button
          *ngIf="displaySignInButton"
          mat-raised-button
          (click)="signIn()"
        >
          Sign in
        </button>

        <img [src]="photoUrl" style="width: 30px;" />
      </div>
    </div>
  `,
  styles: [
    `
      .nav {
        display: table;
        width: 100%;
        background-color: transparent;
      }

      .nav-component {
        display: table-cell;
        margin: 0;
        padding: 0;
        vertical-align: middle;
      }
    `,
  ],
})
export class NavigationComponent {
  @Output()
  private onMenuButtonClicked = new EventEmitter<void>();

  public get displaySignInButton(): boolean {
    return !this.auth.isLoggedIn;
  }

  public get photoUrl(): string {
    if (isNullOrUndefined(this.auth.currentUser)) {
      return "";
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

  constructor(
    public auth: AuthenticationService,
    private searchService: SearchService
  ) {}
}
