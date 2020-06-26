import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BasicUser} from '../models/Model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'member-form-component',
  template: `
    <form
      style="padding: 0 10px;"
      [formGroup]="userForm"
      (ngSubmit)="handleSubmit()"
    >
      <h1 style="font-weight: bold; font-size: 30px;">Account</h1>
      <p>Joined since {{ joinedTimestamp }}</p>

      <div style="display: flex; flex-wrap: wrap; width: 100%;">
        <div style="flex: 1; margin-right: 20px; width: 100%;">
          <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Full name</mat-label>
            <input matInput formControlName="displayName"/>
            <mat-hint>*Required</mat-hint>
          </mat-form-field>

          <br/>

          <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email"/>
            <mat-hint>*Required</mat-hint>
          </mat-form-field>

          <br/>

          <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Address</mat-label>
            <input matInput formControlName="address"/>
          </mat-form-field>
        </div>

        <div style="flex: 1;">
          <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Citizen ID</mat-label>
            <input matInput formControlName="citizenId"/>
          </mat-form-field>

          <br/>

          <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Gender</mat-label>
            <mat-select formControlName="gender">
              <mat-option value="MALE">Male</mat-option>
              <mat-option value="FEMALE">Female</mat-option>
              <mat-option value="OTHER">Other</mat-option>
            </mat-select>
          </mat-form-field>

          <br/>

          <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phoneNumber"/>
          </mat-form-field>
        </div>
      </div>

      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Photo URL</mat-label>
        <input
          matInput
          formControlName="photoURL"
          (keyup)="handleImageEdit()"
        />
      </mat-form-field>

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
  `,
})
export class MemberFormComponent {
  // tslint:disable-next-line:variable-name
  private _user: BasicUser;

  @Input()
  public set user(value: BasicUser) {
    this._user = value;
    this.reset();
  }

  public get user(): BasicUser {
    return this._user;
  }

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onSubmit = new EventEmitter<BasicUser>();

  @Output()
  public onImageEdit = new EventEmitter<string>();

  public userForm = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: [''],
    description: [''],
    citizenId: [''],
    gender: ['MALE', Validators.required],
    phoneNumber: [''],
    photoURL: [''],
  });

  public handleImageEdit() {
    this.onImageEdit.emit(this.userForm.value.photoURL);
  }

  public reset() {
    this.userForm.patchValue({
      displayName: this.user.displayName,
      email: this.user.email,
      address: this.user.address,
      description: this.user.description ?? '',
      citizenId: this.user.citizenId ?? '',
      gender: this.user.gender,
      phoneNumber: this.user.phoneNumber ?? '',
      photoURL: this.user.photoURL ?? '',
    });
  }

  public get joinedTimestamp(): string {
    return this.user.createdAt.toDate().toUTCString() ?? '[Unknown]';
  }

  public get isTheSame(): boolean {
    // tslint:disable-next-line:prefer-const
    const {
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

  constructor(public fb: FormBuilder) {
  }

  public handleSubmit() {
    // tslint:disable-next-line:prefer-const
    const {
      displayName,
      email,
      address,
      description,
      citizenId,
      gender,
      phoneNumber,
      photoURL,
    } = this.userForm.value;

    this.onSubmit.emit({
      userId: this.user.userId,
      displayName,
      email,
      address,
      description,
      citizenId,
      gender,
      phoneNumber,
      type: this.user.type,
      photoURL,
    } as BasicUser);
  }
}
