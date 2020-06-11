import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navigation-button-component',
  template: `
    <button
      mat-flat-button
      class="nav-btn"
      [ngStyle]="{ fontSize: fontSize }"
      [ngClass]="{ 'nav-btn-active': isActive }"
      (click)="handleButtonClicked()"
    >
      <mat-icon *ngIf="icon.length > 0">{{ icon }}</mat-icon>
      <span *ngIf="title.length > 0" style="padding-left: 10px;">
        {{ title }}
      </span>
    </button>
  `,
  styles: [
    `
      .nav-btn {
        border-radius: 0 50px 50px 0;
        display: block;
        width: 300px;
        text-align: left;
        margin-right: 20px;
        padding: 10px 0 10px 20px;
      }

      .nav-btn-active {
        background-color: #e3edfd;
        color: #236ed4;
      }
    `,
  ],
})
export class NavigationButtonComponent {
  @Input()
  public isActive = false;

  @Input()
  public icon = '';

  @Input()
  public title = '';

  // tslint:disable-next-line:variable-name no-input-rename
  @Input('fontSize') private _fontSize = 24;

  public get fontSize(): string {
    return `${this._fontSize}px`;
  }

  @Output()
  private onButtonClicked = new EventEmitter<void>();

  public handleButtonClicked(): void {
    this.onButtonClicked.emit();
  }
}
