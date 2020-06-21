import {Component, Input} from '@angular/core';
import {DisplayColor, Status} from '../models/Model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-row-component',
  template: `
    <button
      mat-stroked-button
      class="content-card"
      [ngClass]="{ 'content-card-active': isActive, 'content-card-warn': isWarn, 'content-card-primary': isPrimary }"
    >
      <div
        style="width: 100%; padding: 3px 0; background-color: transparent; display: flex; justify-content: flex-start; align-items: center; align-content: center;">
        <span *ngIf="status.icon !== undefined" style="margin-right: 10px;">
          <mat-icon matPrefix>{{ status.icon }}</mat-icon>
        </span>

        <div>
          <h5 style="font-weight: bold; font-size: 14px;">
            {{ title || "Unknown" }}
          </h5>
          <p style="font-size: 13px; line-height: 20px;">
            {{ description || "No description" }}
          </p>
        </div>
      </div>
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
        width: 100%;
        margin-bottom: 5px;
        border-radius: 3px;
      }

      .content-card-warn {
        color: crimson;
      }

      .content-card-primary {
        color: #fe9e16;
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
    if (this._title?.length > 40) {
      return this._title.substr(0, 40) + '...';
    }
    return this._title;
  }

  // tslint:disable-next-line:no-input-rename
  @Input('description')
  // tslint:disable-next-line:variable-name
  private _description = '';

  // tslint:disable-next-line:no-input-rename
  @Input('status')
  // tslint:disable-next-line:variable-name
  public status: Status;

  public get isWarn(): boolean {
    return this.status.color === DisplayColor.WARN;
  }

  public get isPrimary(): boolean {
    return this.status.color === DisplayColor.PRIMARY;
  }

  public get isNormal(): boolean {
    return this.status.color === DisplayColor.NORMAL;
  }

  public get description(): string {
    if (this._description?.length > 40) {
      return this._description.substr(0, 40) + '...';
    }
    return this._description;
  }

  @Input()
  public isActive = false;
}
