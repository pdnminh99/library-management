import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "navigation-button-component",
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
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        display: block;
        width: 300px;
        text-align: left;
        margin-right: 20px;
        padding: 10px 0;
        padding-left: 20px;
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
  public isActive: boolean = false;

  @Input()
  public icon: string = "";

  @Input()
  public title: string = "";

  @Input("fontSize")
  private _fontSize: number = 24;

  public get fontSize(): string {
    return `${this._fontSize}px`;
  }

  @Output()
  private onButtonClicked = new EventEmitter<void>();

  public handleButtonClicked(): void {
    this.onButtonClicked.emit();
  }
}
