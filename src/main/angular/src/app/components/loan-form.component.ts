import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BasicUser, Book, Gender, Loan} from '../models/Model';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';
import {MemberService} from '../authentication/member.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'loan-form-component',
  template: `
    <form style="padding: 0 10px;" [formGroup]="loanForm" (ngSubmit)="handleSubmit()">
      <div style="display: flex; flex-wrap: wrap; width: 100%;">
        <div style="flex: 1; margin-right: 20px; width: 100%;">
          <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>User</mat-label>
            <input matInput formControlName="userId" [matAutocomplete]="userId">

            <mat-autocomplete #userId="matAutocomplete">
              <mat-option *ngFor="let user of users" [title]="user.userId" [value]="user.userId">
                {{ user.displayName }} [{{ user.email }}]
              </mat-option>
            </mat-autocomplete>
          </mat-form-field>

          <br/>

          <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Deadline</mat-label>
            <input matInput formControlName="deadline">
          </mat-form-field>
        </div>

        <div style="flex: 1;">
          <div>Array goes here</div>
        </div>

      </div>

      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="description"></textarea>
      </mat-form-field>

      <button mat-stroked-button style="font-size: larger; margin-right: 20px;" type="submit"
              [disabled]="!loanForm.valid || isTheSame">Save
      </button>
      <button mat-stroked-button [disabled]="isTheSame" (click)="reset()" style="font-size: larger">Reset</button>
    </form>
  `
})
export class LoanFormComponent {

  public get users(): BasicUser[] {
    const value = this.loanForm.value.userId.toLowerCase();
    if (value.length === 0) {
      return this.memberService.items.slice(0, 10);
    }
    return this.memberService
      .items
      .filter(mem => {
        return mem.displayName?.toLowerCase()?.includes(value) ||
          mem.email?.toLowerCase()?.includes(value) ||
          mem.phoneNumber?.toLowerCase()?.includes(value) ||
          mem.citizenId?.toLowerCase()?.includes(value);
      });
  }

  constructor(public fb: FormBuilder,
              private memberService: MemberService) {
  }

  public get isTheSame(): boolean {
    return true;
    // tslint:disable-next-line:prefer-const
    // let {userId, description, userId, deadline,} = this.loanForm.value;
    // return this.loan.userId === userId &&
    //   this.loan.author === author &&
    //   this.loan.description === description &&
    //   this.loan.genre === genre &&
    //   this.loan.publisher === publisher &&
    //   this.loan.yearOfPublishing === yearOfPublishing &&
    //   this.loan.count === count &&
    //   this.loan.photoURL === photoURL;
  }

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onSubmit = new EventEmitter<Book>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onDiscard = new EventEmitter();

  @Input()
  public loan: Loan = {
    loanId: null,
    userId: '',
    description: '',
    displayName: '',
    email: '',
    civilianId: '',
    address: '',
    gender: Gender.MALE,
    deadline: Timestamp.now(),
    returnedAt: undefined,
    books: [],
    createdAt: Timestamp.now()
  } as Loan;

  public loanForm = this.fb.group({
    userId: ['', Validators.required],
    description: [''],
    deadline: ['']
  });

  public handleSubmit() {
    // this.onSubmit.emit(this.loanForm.value as Book);
  }

  reset() {

  }
}
