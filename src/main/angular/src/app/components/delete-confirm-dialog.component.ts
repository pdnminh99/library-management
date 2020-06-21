import {Component, Inject} from '@angular/core';
import {Displayable} from '../models/Model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'delete-confirm-dialog-component',
  template: `
    <div>
      <h1 mat-dialog-title>Confirm delete</h1>
      <div mat-dialog-content>
        Are you sure to delete <strong>{{ displayableItem.title }}</strong>?
      </div>
      <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="{ answer: true }">Save</button>
        <button mat-button (click)="onCancel()">Cancel</button>
      </div>
    </div>
  `
})
export class DeleteConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public displayableItem: Displayable
  ) {
  }

  public onCancel(): void {
    this.dialogRef.close({answer: false});
  }

}
