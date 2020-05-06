import { Component } from "@angular/core";

@Component({
  selector: "login-card-component",
  template: `
    <mat-card style="width: 500px; margin: 0 auto;">
      <mat-card-header
        style="text-align: center; font-weight: bolder; font-size: 20px;"
      >
        <mat-card-title>
          Library Management App
        </mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <form class="example-form">
          <mat-form-field style="width: 100%;" appearance="fill">
            <mat-label>Account</mat-label>
            <input
              matInput
              name="account"
              [(ngModel)]="account"
              placeholder="Account"
            />
            <button
              mat-button
              *ngIf="account.length > 0"
              matSuffix
              mat-icon-button
              aria-label="Clear"
              (click)="account = ''"
            >
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>
          <br />

          <mat-form-field style="width: 100%;" appearance="fill">
            <mat-label>Password</mat-label>
            <input
              name="password"
              matInput
              [(ngModel)]="password"
              [type]="hide ? 'password' : 'text'"
            />
            <button
              mat-icon-button
              matSuffix
              (click)="hide = !hide"
              [attr.aria-label]="'Hide password'"
              [attr.aria-pressed]="hide"
            >
              <mat-icon>{{ hide ? "visibility_off" : "visibility" }}</mat-icon>
            </button>
          </mat-form-field>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
})
export class LoginCardComponent {
  account = "";

  password = "";

  hide = true;
}
