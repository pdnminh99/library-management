import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "mini-sidenav-btn-component",
  template: `
    <mat-toolbar-row>
      <button mat-icon-button (click)="handleButtonClicked()">
        <mat-icon>{{ icon }}</mat-icon>
      </button>
    </mat-toolbar-row>
  `,
})
export class MiniSideNavigationButtonComponent {
  @Input()
  public icon: string = "";

  @Input()
  public isActive: boolean = false;

  @Output()
  private onButtonClicked = new EventEmitter<void>();

  public handleButtonClicked(): void {
    this.onButtonClicked.emit();
  }
}
