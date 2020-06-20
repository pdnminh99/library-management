import {Component, Inject} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Displayable} from '../models/Model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-card-component',
  template: `
    <div style="width: 500px; margin: 0 auto;">
      <h1 mat-dialog-title>Login</h1>

      <div mat-dialog-content>
        <mat-form-field style="width: 100%;" appearance="fill">
          <mat-label>Email</mat-label>
          <input
            matInput
            name="account"
            [disabled]="isProcessing"
            [(ngModel)]="email"
            placeholder="Account"
          />
          <button
            mat-icon-button
            *ngIf="email.length > 0"
            matSuffix
            aria-label="Clear"
            (click)="email = ''"
          >
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>

        <br *ngIf="!isSignIn"/>

        <mat-form-field style="width: 100%;" appearance="fill" *ngIf="!isSignIn">
          <mat-label>Photo URL</mat-label>
          <input
            matInput
            [disabled]="isProcessing"
            [(ngModel)]="photoURL"
            placeholder="Photo URL"
          />
          <button
            mat-icon-button
            *ngIf="photoURL.length > 0"
            matSuffix
            aria-label="Clear"
            (click)="photoURL = ''"
          >
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>

        <br *ngIf="!isSignIn"/>

        <mat-form-field style="width: 100%;" appearance="fill" *ngIf="!isSignIn">
          <mat-label>Display name</mat-label>
          <input
            matInput
            [disabled]="isProcessing"
            [(ngModel)]="displayName"
            placeholder="Full name"
          />
          <button
            mat-icon-button
            *ngIf="displayName.length > 0"
            matSuffix
            aria-label="Clear"
            (click)="displayName = ''"
          >
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>

        <br *ngIf="!isSignIn"/>

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

        <mat-form-field style="width: 100%;" appearance="fill" *ngIf="!isSignIn">
          <mat-label>Re-enter Password</mat-label>
          <input
            name="password"
            matInput
            [disabled]="isProcessing"
            [(ngModel)]="reenterPassword"
            [type]="reenterPassword ? 'password' : 'text'"
          />
          <button
            mat-icon-button
            matSuffix
            (click)="reenterHide = !reenterHide"
            [attr.aria-label]="'Hide password'"
            [attr.aria-pressed]="reenterPassword"
          >
            <mat-icon>{{ reenterHide ? "visibility_off" : "visibility" }}</mat-icon>
          </button>
        </mat-form-field>

        <div *ngIf="errorMessage.length > 0" style="color: crimson;">{{ errorMessage }}</div>

        <div style="display: flex; justify-content: flex-start; align-items: center; width: 100%;">
          <button
            *ngIf="!isSignIn"
            (click)="signUp()"
            mat-stroked-button
            color="primary"
            class="sign-in-btn"
          >
            Sign up
          </button>
          <button
            *ngIf="isSignIn"
            (click)="signIn()"
            mat-stroked-button
            color="primary"
            class="sign-in-btn"
          >
            Sign in
          </button>

          <button
            mat-stroked-button
            (click)="signInWithGoogle()"
            color="primary"
            class="sign-in-btn"
            style="display: flex;"
          >
            <img
              style="max-width: 30px; flex: 1;"
              src="https://img.icons8.com/plasticine/2x/google-logo.png" alt="google-icon"
            />

            <span style="flex: 2;">Sign with Google</span>
          </button>

          <span
            style="text-align: left;"
            *ngIf="isSignIn"
          >
              Or create new <a href="javascript:void(0)" (click)="isSignIn = false">here</a>.
            </span>

          <span
            style="text-align: left;"
            *ngIf="!isSignIn"
          >
              Or sign in <a href="javascript:void(0)" (click)="isSignIn = true">here</a>.
            </span>
        </div>
      </div>
    </div>
  `,
  styles: [
      `
      .sign-in-btn {
        padding: 0 5px;
        margin-right: 10px;
        text-align: center;
        height: 40px;
      }
    `,
  ],
})
export class LoginCardComponent {
  public errorMessage = '';

  public email = '';

  public password = '';

  public photoURL = '';

  public displayName = '';

  public reenterPassword = '';

  public hide = true;

  public reenterHide = true;

  public isSignIn = true;

  public get isProcessing(): boolean {
    return this.auth.isProcessing;
  }

  constructor(private router: Router,
              private auth: AuthenticationService,
              public dialogRef: MatDialogRef<LoginCardComponent>) {
  }

  public signInWithGoogle() {
    this.auth.signInWithGoogleAccount().then(_ => {
      this.dialogRef.close();
    }).catch(err => {
      this.dialogRef.close();
    });
  }

  public signUp() {
    if (this.password !== this.reenterPassword) {
      this.errorMessage = 'Password not match!';
      return;
    }
    if (this.password.length === 0 || this.email.length === 0) {
      this.errorMessage = 'Invalid email/password!';
      return;
    }
    if (this.photoURL.length === 0) {
      this.errorMessage = 'Photo URL cannot empty.';
      return;
    }
    if (this.displayName.length === 0) {
      this.errorMessage = 'Display name cannot empty.';
    }
    this.auth.signUp(this.email, this.password, this.displayName, this.photoURL)
      .then(_ => this.dialogRef.close());
  }

  public signIn() {
    this.auth.signIn(this.email, this.password)
      .then(result => {
        if (result) {
          this.dialogRef.close();
        }
        this.errorMessage = 'Email and password does not match any user! Try signing up a new one.';
        this.isSignIn = false;
      });
  }
}
