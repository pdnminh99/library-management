import {Component, Output, EventEmitter, Input} from '@angular/core';
import {SearchService} from '../authentication/search.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search-bar-component',
  template: `
    <span
      id="search-bar"
      [ngStyle]="{
        height: searchBoxHeight,
        borderRadius: searchBoxBorderRadius
      }"
    >
      <mat-icon matPrefix>search</mat-icon>
      <input
        matInput
        type="text"
        placeholder="Search ..."
        [(ngModel)]="value"
      />
    </span>
  `,
  styles: [
      `
      #search-bar {
        border-radius: 7px;
        border: none;
        background-color: transparent;
        padding: 0 0 0 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.54);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      #search-bar input {
        padding-right: 5px;
        vertical-align: middle;
        margin-left: 20px;
        font-size: 18px;
        height: 100%;
        border: none;
        background-color: transparent;
      }

      #search-bar input:focus {
        outline: none;
      }

      #search-bar input::placeholder {
        text-align: left;
      }
    `,
  ],
})
export class SearchBarComponent {
  @Input()
  private height = 50;

  @Input()
  private width = 300;

  @Input()
  private borderRadius = 7;

  public get searchBoxHeight(): string {
    return `${this.height}px`;
  }

  public get searchBoxWidth(): string {
    return `${this.width}px`;
  }

  public get searchBoxBorderRadius(): string {
    return `${this.borderRadius}px`;
  }

  @Input('value')
  private _value: string;

  public get value(): string {
    return this._value;
  }

  @Output()
  private onValueChange = new EventEmitter<string>();

  public set value(newValue: string) {
    this._value = newValue;
    this.onValueChange.emit(newValue);
  }

  constructor() {
  }
}
