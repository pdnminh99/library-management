import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-row-component',
  template: `
    <button
      mat-flat-button
      class="content-card"
      [ngClass]="{ 'content-card-active': isActive }"
      (click)="handleRowClicked()"
    >
      <h5 style="font-weight: bold; font-size: 14px;">
        {{ title || "Unknown" }}
      </h5>
      <p style="font-size: 13px; line-height: 20px;">
        {{ description || "No description" }}
      </p>
    </button>
  `,
  styles: [
      `
      h5,
      p {
        margin: 0;
        text-align: left;
      }

      .content-card-active {
        background-color: #e3edfd;
        color: #236ed4;
      }

      .content-card {
        padding: 5px 10px;
        width: 100%;
        border-radius: 3px;
      }

      .content-card:hover {
        background-color: #e3edfd;
        color: #236ed4;
      }
    `,
  ],
})
export class ContentRowComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('title')
  // tslint:disable-next-line:variable-name
  private _title = '';

  public get title(): string {
    if (this._title.length > 40) {
      return this._title.substr(0, 40) + '...';
    }
    return this._title;
  }

  @Input('description')
  // tslint:disable-next-line:variable-name
  private _description = '';

  public get description(): string {
    return this._description;
    if (this._description !== null && this._description.length > 40) {
      return this._description.substr(0, 40) + '...';
    }
    return this._description;
  }

  @Input()
  public isActive = false;

  @Output()
  private onRowClicked = new EventEmitter<void>();

  public handleRowClicked(): void {
    this.onRowClicked.emit();
  }
}
