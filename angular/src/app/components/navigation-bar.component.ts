import { Component, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";

@Component({
  selector: "navigation-component",
  template: `
    <div class="nav">
      <navigation-control-component
        class="nav-component"
        title="BOOKS"
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
        >
          Sign in
        </button>
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
    return this.auth.isLoggedIn;
  }

  public valueChange(newValue: string): void {}

  public handleMenuButtonClicked(): void {
    this.onMenuButtonClicked.emit();
  }

  constructor(private auth: AuthenticationService) {}
}
