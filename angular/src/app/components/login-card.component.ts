import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "login-card-component",
  template: `
    <mat-card style="width: 500px; margin: 0 auto;">
      <mat-card-header
        style="text-align: center; font-weight: bolder; font-size: 20px;"
      >
        <mat-card-title>
          Authentication
        </mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <form class="example-form">
          <mat-form-field style="width: 100%;" appearance="fill">
            <mat-label>Account</mat-label>
            <input
              matInput
              name="account"
              [disabled]="isProcessing"
              [(ngModel)]="account"
              placeholder="Account"
            />
            <button
              mat-icon-button
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
              [disabled]="isProcessing"
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

          <div style="display: table; width: 100%;">
            <button
              mat-button
              color="primary"
              class="sign-in-btn"
            >
              <mat-spinner *ngIf="isProcessing" [diameter]="20"></mat-spinner>
              <span *ngIf="!isProcessing">Sign in</span>
            </button>

            <span
              style="display: table-cell; text-align: left; vertical-align: middle;"
            >
              Or create new here
            </span>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .sign-in-btn {
        padding: 0;
        margin: 0;
        margin-right: 5px;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        height: 40px;
      }
    `,
  ],
})
export class LoginCardComponent {
  account = "";

  password = "";

  hide = true;

  public get isProcessing(): boolean {
    return this.auth.isProcessing;
  }

  constructor(private router: Router, private auth: AuthenticationService) {}

  // signUp() {
  //   this.auth.signUp(this.account, this.password);
  // }
}
