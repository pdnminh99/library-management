import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";
import { BasicUser, UserType } from "../models/Model";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "account-page",
  template: ` <div style="margin: 20px;">
    <mat-card id="info-card">
      <h1 *ngIf="!isUserActive">No user info found!</h1>
      <div
        *ngIf="isUserActive"
        style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0 30px; flex: 1;"
      >
        <img
          style="max-width: 200px; min-width: 100px; margin-bottom: 10px; border-radius: 100px;"
          [src]="displayImage"
          [alt]="displayImage"
          (error)="isImageFailed = true"
        />
        <mat-chip-list>
          <mat-chip *ngIf="isAdmin" color="warn" selected>Admin</mat-chip>
          <mat-chip *ngIf="isMember">Member</mat-chip>
        </mat-chip-list>
      </div>
      <form
        *ngIf="isUserActive"
        style="flex: 2; padding: 0 10px;"
        [formGroup]="userForm"
        (ngSubmit)="onSubmit()"
      >
        <h1 style="font-weight: bold; font-size: 30px;">Account</h1>
        <p>Joined since {{ joinedTimestamp }}</p>

        <div style="display: flex; flex-wrap: wrap; width: 100%;">
          <div style="flex: 1; margin-right: 20px; width: 100%;">
            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Full name</mat-label>
              <input matInput formControlName="displayName" />
              <mat-hint>*Required</mat-hint>
            </mat-form-field>

            <br />

            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" />
              <mat-hint>*Required</mat-hint>
            </mat-form-field>

            <br />

            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Address</mat-label>
              <input matInput formControlName="address" />
            </mat-form-field>
          </div>

          <div style="flex: 1;">
            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Citizen ID</mat-label>
              <input matInput formControlName="citizenId" />
              <mat-hint>*Required</mat-hint>
            </mat-form-field>

            <br />

            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Gender</mat-label>
              <mat-select formControlName="gender">
                <mat-option value="MALE">Male</mat-option>
                <mat-option value="FEMALE">Female</mat-option>
                <mat-option value="OTHER">Other</mat-option>
              </mat-select>
            </mat-form-field>

            <br />

            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Phone Number</mat-label>
              <input matInput formControlName="phoneNumber" />
              <mat-hint>*Required</mat-hint>
            </mat-form-field>
          </div>
        </div>

        <mat-form-field appearance="outline" style="width: 100%;">
          <mat-label>Photo URL</mat-label>
          <input
            matInput
            formControlName="photoURL"
            (keydown)="handleImageChange()"
          />
        </mat-form-field>

        <br />

        <mat-form-field appearance="outline" style="width: 100%;">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description"></textarea>
        </mat-form-field>

        <button
          mat-stroked-button
          style="font-size: larger; margin-right: 20px;"
          type="submit"
          [disabled]="!userForm.valid || isTheSame"
        >
          Save
        </button>
        <button
          mat-stroked-button
          [disabled]="isTheSame"
          (click)="reset()"
          style="font-size: larger"
        >
          Reset
        </button>
      </form>
    </mat-card>
  </div>`,
  styles: [
    `
      #info-card {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
// tslint:disable-next-line:component-class-suffix
export class AccountPage implements OnInit {
  public userForm = this.fb.group({
    displayName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    address: [""],
    description: [""],
    citizenId: ["", Validators.required],
    gender: ["MALE", Validators.required],
    phoneNumber: ["", Validators.required],
    photoURL: [""],
  });

  public isImageFailed = false;

  private _image = this.auth.currentUser?.photoURL ?? "";

  public get displayImage(): string {
    return this.isImageFailed
      ? "https://thumbs.dreamstime.com/b/black-linear-photo-camera-logo-like-no-image-available-black-linear-photo-camera-logo-like-no-image-available-flat-stroke-style-106031126.jpg"
      : this._image;
  }

  public reset() {
    this.userForm.patchValue({
      displayName: this.user.displayName,
      email: this.user.email,
      address: this.user.address,
      description: this.user.description ?? "",
      citizenId: this.user.citizenId ?? "",
      gender: this.user.gender,
      phoneNumber: this.user.phoneNumber ?? "",
      photoURL: this.user.photoURL ?? "",
    });
  }

  public get joinedTimestamp(): string {
    return this.user.createdAt.toDate().toUTCString() ?? "[Unknown]";
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

  public get isTheSame(): boolean {
    // tslint:disable-next-line:prefer-const
    let {
      displayName,
      email,
      address,
      description,
      citizenId,
      gender,
      phoneNumber,
      photoURL,
    } = this.userForm.value;
    return (
      this.user.displayName === displayName &&
      this.user.email === email &&
      this.user.address === address &&
      this.user.description === description &&
      this.user.citizenId === citizenId &&
      this.user.gender === gender &&
      this.user.phoneNumber === phoneNumber &&
      this.user.photoURL === photoURL
    );
  }

  constructor(public auth: AuthenticationService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.reset();
  }

  public onSubmit() {
    this.auth.update(this.userForm.value);
  }

  public handleImageChange() {
    this._image = this.userForm.value.photoURL;
    this.isImageFailed = false;
  }
}
