import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Displayable, UserType} from '../models/Model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '',
  template: `
    <div>
      <h1 mat-dialog-title>Confirm promotion</h1>
      <div mat-dialog-content>
        Are you sure to promote <strong>{{ data.displayName }}</strong> from <strong>{{ data.from }}</strong> to
        <strong>{{ data.to }}</strong>?
      </div>
      <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="{ answer: true }">Save</button>
        <button mat-button (click)="onCancel()">Cancel</button>
      </div>
    </div>
  `
})
export class RoleChangeConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<RoleChangeConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { displayName: string, from: UserType, to: UserType }
  ) {
  }

  public onCancel(): void {
    this.dialogRef.close({answer: false});
  }

}
