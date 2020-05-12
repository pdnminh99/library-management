import { Component, Output, EventEmitter } from "@angular/core";
import { SearchService } from "../authentication/search.service";

@Component({
  selector: "search-bar-component",
  template: `
    <input
      id="search-bar"
      type="text"
      placeholder="Search"
      [(ngModel)]="searchService.value"
    />
  `,
  styles: [
    `
      #search-bar {
        background: #fff;
        border-radius: 7px;
        border: none;
        background-color: transparent;
        height: 50px;
        width: 600px;
        padding-left: 20px;
        font-size: 18px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.54);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      #search-bar:focus {
        outline: none;
      }

      #search-bar::placeholder {
        text-align: center;
      }
    `,
  ],
})
export class SearchBarComponent {
  // private _value = "";

  // public set value(newValue: string) {
  //   this.onValueChange.emit(newValue);
  //   this._value = newValue;
  // }

  // public get value(): string {
  //   return this._value;
  // }

  // @Output()
  // private onValueChange = new EventEmitter<string>();

  // @Output()
  // private onFocus = new EventEmitter<void>();

  // onFocusHandler(): void {
  //   this.onFocus.emit();
  // }

  constructor(public searchService: SearchService) {}
}
