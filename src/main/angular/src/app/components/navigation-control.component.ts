import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navigation-control-component',
  template: `
    <div style="padding-left: 20px; display: flex; justify-content: flex-start; align-items: center;">
      <button
        class="nav-heading-font"
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
  public title = '';

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onMenuButtonClicked = new EventEmitter<void>();

  public handleMenuButtonClicked(): void {
    this.onMenuButtonClicked.emit();
  }
}
