import {Component, Input} from '@angular/core';

export enum ToolbarMode {
  CREATE, EDIT, STATIC
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'toolbar-component',
  template: `
    <mat-toolbar id="toolbar">

      <button *ngIf="isCreateMode" mat-flat-button style="margin-right: 10px" [routerLink]="['']" color="primary">
        <mat-icon>add_circle_outline</mat-icon>
        Save
      </button>

      <button *ngIf="isCreateMode" mat-flat-button style="margin-right: 10px" [routerLink]="['']" color="warn">
        <mat-icon>add_circle_outline</mat-icon>
        Discard
      </button>

      <button *ngIf="isStaticMode" mat-flat-button style="margin-right: 10px;" [routerLink]="['create']">
        <mat-icon>add_circle_outline</mat-icon>
        Create
      </button>
      <button *ngIf="isStaticMode" mat-flat-button style="margin-right: 10px;">
        <mat-icon>create</mat-icon>
        Edit
      </button>
      <button *ngIf="isStaticMode" mat-flat-button style="margin-right: 10px;">
        <mat-icon>delete</mat-icon>
        Delete
      </button>
      <button *ngIf="isStaticMode" mat-flat-button style="margin-right: 10px;">
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
export class ToolbarComponent {

  @Input()
  public mode: ToolbarMode = ToolbarMode.STATIC;

  public get isCreateMode(): boolean {
    return this.mode === ToolbarMode.CREATE;
  }

  public get isStaticMode(): boolean {
    return this.mode === ToolbarMode.STATIC;
  }

}
