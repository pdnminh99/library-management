import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Displayable, EntityService, ToolbarMode} from '../models/Model';
import {DeleteConfirmDialogComponent} from './delete-confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'toolbar-component',
  template: `
    <mat-toolbar id="toolbar">
      <button (click)="onCreate.emit()"
              [disabled]="disableAll"
              mat-flat-button
              style="margin-right: 10px;">
        <mat-icon>add_circle_outline</mat-icon>
        Create
      </button>
      <button (click)="onEdit.emit()"
              [disabled]="disableAll || !service.isActive"
              mat-flat-button style="margin-right: 10px;">
        <mat-icon>create</mat-icon>
        Edit
      </button>
      <button (click)="handleDeleteEvent()"
              [disabled]="disableAll || !service.isActive"
              mat-flat-button
              style="margin-right: 10px;">
        <mat-icon>delete</mat-icon>
        Delete
      </button>
      <button (click)="onRefresh.emit()"
              [disabled]="disableAll"
              mat-flat-button
              style="margin-right: 10px;">
        <mat-icon>refresh</mat-icon>
        Refresh
      </button>
    </mat-toolbar>
  `,
  styles: [`
    #toolbar {
      display: flex;
      align-items: center;
      height: 51px;
      justify-content: center;
      border-top: solid black 1px;
      border-bottom: solid black 1px;
    }
  `]
})
export class ToolbarComponent<T extends A, A extends Displayable> {

  @Input()
  public service: EntityService<T, A>;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onDelete = new EventEmitter();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onRefresh = new EventEmitter();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onCreate = new EventEmitter();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onEdit = new EventEmitter();

  constructor(public dialog: MatDialog) {
  }

  public get disableAll(): boolean {
    return this.service.isProcessing || this.service.mode !== ToolbarMode.STATIC;
  }

  public handleDeleteEvent(): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: this.service.selectedItem
    });
    dialogRef.afterClosed().subscribe(({answer}) => {
      if (answer) {
        this.onDelete.emit();
      }
    });
  }
}
