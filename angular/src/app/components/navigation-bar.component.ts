import { Component, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";

@Component({
  selector: "navigation-component",
  template: `
    <div style="display: table; width: 100%; background-color: transparent;">
      <div class="nav-component" style="width: 300px; padding-left: 20px;">
        <button mat-icon-button (click)="handleMenuButtonClicked()">
          <mat-icon>menu</mat-icon>
        </button>
        <h2
          style="display: inline-block; height: 100%; vertical-align: middle; padding-left: 10px; margin: 0;"
        >
          Dashboard
        </h2>
      </div>
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
          style="display: table-cell; vertical-align: middle;"
        >
          Sign in
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .nav-component {
        display: table-cell;
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
