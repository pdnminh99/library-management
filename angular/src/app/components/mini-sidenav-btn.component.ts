import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "mini-sidenav-btn-component",
  template: `
    <mat-toolbar-row>
      <button
        mat-icon-button
        [ngClass]="{ 'sidenav-btn-active': isActive }"
        (click)="handleButtonClicked()"
      >
        <mat-icon>{{ icon }}</mat-icon>
      </button>
    </mat-toolbar-row>
  `,
  styles: [
    `
      .sidenav-btn-active {
        background-color: #e3edfd;
        color: #236ed4;
      }

      button:hover {
        background-color: #e3edfd;
        color: #236ed4;
      }
    `,
  ],
})
export class MiniSideNavigationButtonComponent {
  @Input()
  public icon: string = "apps";

  @Input()
  public isActive: boolean = false;

  @Output()
  private onButtonClicked = new EventEmitter<void>();

  public handleButtonClicked(): void {
    this.onButtonClicked.emit();
  }
}
