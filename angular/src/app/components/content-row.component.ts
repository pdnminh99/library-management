import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "content-row-component",
  template: `
    <button
      mat-flat-button
      class="content-card"
      [ngClass]="{ 'content-card-active': isActive }"
      (click)="handleRowClicked()"
    >
      <h5 style="font-weight: bold; font-size: 14px;">{{ title }}</h5>
      <p style="font-size: 14px;">{{ description }}</p>
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
        padding: 3px 5px;
        border-radius: 5px;
        width: 100%;
        margin: 3px 0;
      }

      .content-card:hover {
        background-color: #e3edfd;
        color: #236ed4;
      }
    `,
  ],
})
export class ContentRowComponent {
  @Input("title")
  private _title: string = "";

  public get title(): string {
    if (this._title.length > 40) {
      return this._title.substr(0, 40) + "...";
    }
    return this._title;
  }

  @Input("description")
  private _description: string = "";

  public get description(): string {
    if (this._description.length > 40) {
      return this._description.substr(0, 40) + "...";
    }
    return this._description;
  }

  @Input()
  public isActive: boolean = false;

  @Output()
  private onRowClicked = new EventEmitter<void>();

  public handleRowClicked(): void {
    this.onRowClicked.emit();
  }
}
