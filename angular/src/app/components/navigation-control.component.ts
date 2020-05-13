import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "navigation-control-component",
  template: `
    <div style="padding-left: 20px;">
      <button
        class="nav-heading-font "
        mat-icon-button
        (click)="handleMenuButtonClicked()"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <h2 class="nav-heading-font nav-heading">
        {{ title }}
      </h2>
    </div>
  `,
  styles: [
    `
      .nav-heading-font {
        color: #236ed4;
      }

      .nav-heading {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        padding-left: 10px;
        margin: 0;
      }

      .nav-heading:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class NavigationControlComponent {
  @Input()
  public title: string = "";

  @Output()
  public onMenuButtonClicked = new EventEmitter<void>();

  public handleMenuButtonClicked(): void {
    this.onMenuButtonClicked.emit();
  }
}
