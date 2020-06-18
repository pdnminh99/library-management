import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToolbarMode} from '../models/Model';
import {LoanService} from '../authentication/loan.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'loan-toolbar-component',
  template: `
    <mat-toolbar id="toolbar">
      <button (click)="onCreate.emit()"
              [disabled]="disableAll"
              mat-flat-button style="margin-right: 10px;">
        <mat-icon>add_circle_outline</mat-icon>
        Create
      </button>

      <button (click)="onDelete.emit()"
              [disabled]="disableAll"
              mat-flat-button style="margin-right: 10px;">
        <mat-icon>delete</mat-icon>
        Delete
      </button>

      <button (click)="onReturn.emit()"
              [disabled]="disableAll"
              mat-flat-button style="margin-right: 10px;">
        <mat-icon>create</mat-icon>
        Mark as returned
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
export class LoanToolbarComponent {

  @Input()
  public service: LoanService;

  @Output()
  public onCreate = new EventEmitter();

  @Output()
  public onDelete = new EventEmitter();

  @Output()
  public onReturn = new EventEmitter();

  public get disableAll(): boolean {
    return this.service.isProcessing || this.service.mode !== ToolbarMode.STATIC;
  }

}
