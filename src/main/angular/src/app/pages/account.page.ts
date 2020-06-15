import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {BasicUser, UserType} from '../models/Model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'account-page',
  template: `
    <div style="margin: 20px;">
      <mat-card id="info-card">
        <h1 *ngIf="!isUserActive">No user info found!</h1>
        <div *ngIf="isUserActive"
             style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0 30px; flex: 1;">
          <img style="max-width: 200px; min-width: 100px; margin-bottom: 10px; border-radius: 100px;" [src]="user.photoURL"
               [alt]="user.displayName"/>
          <mat-chip-list>
            <mat-chip *ngIf="isAdmin" color="warn" selected>Admin</mat-chip>
            <mat-chip *ngIf="isMember">Member</mat-chip>
          </mat-chip-list>
        </div>
        <div *ngIf="isUserActive" style="flex: 2; padding: 0 10px;">
          <h1 style="font-weight: bold; font-size: 30px;">Account</h1>
          <p>Joined since {{ joinedTimestamp }}</p>

          <div style="display: flex; flex-wrap: wrap; width: 100%;">
            <div style="flex: 1; margin-right: 20px; width: 100%;">
              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Full name</mat-label>
                <input matInput>
              </mat-form-field>

              <br/>

              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Email</mat-label>
                <input matInput>
              </mat-form-field>

              <br/>

              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Address</mat-label>
                <input matInput>
              </mat-form-field>

              <br/>

              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Password</mat-label>
                <input matInput [type]="passwordHide ? 'password' : 'text'">

                <button mat-icon-button matSuffix (click)="passwordHide = !passwordHide" [attr.aria-label]="'Hide password'"
                        [attr.aria-pressed]="passwordHide">
                  <mat-icon>{{passwordHide ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
              </mat-form-field>

              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Re-enter Password</mat-label>
                <input matInput [type]="reenterPasswordHide ? 'password' : 'text'">

                <button mat-icon-button matSuffix (click)="reenterPasswordHide = !reenterPasswordHide" [attr.aria-label]="'Hide password'"
                        [attr.aria-pressed]="reenterPasswordHide">
                  <mat-icon>{{reenterPasswordHide ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
              </mat-form-field>
            </div>


            <div style="flex: 1;">
              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Citizen ID</mat-label>
                <input matInput>
              </mat-form-field>

              <br/>

              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Gender</mat-label>
                <mat-select>
                  <mat-option value="MALE">Male</mat-option>
                  <mat-option value="FEMALE">Female</mat-option>
                </mat-select>
              </mat-form-field>

              <br/>

              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Phone Number</mat-label>
                <input matInput>
              </mat-form-field>

              <br/>

              <mat-form-field appearance="outline" style="width: 100%;">
                <mat-label>Description</mat-label>
                <textarea matInput></textarea>
              </mat-form-field>
            </div>

          </div>

          <button mat-stroked-button style="font-size: larger; margin-right: 20px;">Save</button>
          <button mat-stroked-button style="font-size: larger">Reset</button>

        </div>
      </mat-card>
    </div>`,
  styles: [`
    #info-card {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
// tslint:disable-next-line:component-class-suffix
export class AccountPage {

  public passwordHide = true;

  public reenterPasswordHide = true;

  public get joinedTimestamp(): string {
    return this.user.createdAt.toDate().toUTCString() ?? '[Unknown]';
  }

  public get isAdmin(): boolean {
    return this.user.type === UserType.ADMIN;
  }

  public get isMember(): boolean {
    return this.user.type === UserType.MEMBER;
  }

  public get isUserActive(): boolean {
    return this.user !== undefined;
  }

  public get user(): BasicUser {
    return this.auth.currentUser;
  }

  constructor(public auth: AuthenticationService) {
  }


}
