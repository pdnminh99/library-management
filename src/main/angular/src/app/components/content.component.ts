import {Component, Input} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {BookService} from '../authentication/book.service';
import {BasicBook, Displayable, EntityService} from '../models/Model';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-component',
  template: `
    <div style="height: 100%; display: flex;">
      <div id="left-panel">
        <mat-form-field id="mini-searchbar" appearance="fill">
          <input
            matInput
            type="text"
            placeholder="Search"
          />
          <button matSuffix mat-icon-button>
            <mat-icon>filter_list</mat-icon>
          </button>
        </mat-form-field>

        <content-list-component
          [items]="items"
          id="content-list"></content-list-component>

        <mat-paginator
          [length]="100"
          [pageSize]="10"
          style="background-color: transparent; flex: 1"
        ></mat-paginator>
      </div>

      <div style="flex: 3">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
      `
      #content-list {
        overflow-y: auto;
        flex: 4;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      #left-panel {
        flex: 1;
        background-color: transparent;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        border: none;
      }

      @media screen and (max-width: 900px) {
        #left-panel {
          display: none;
        }
      }
    `,
  ],
})
export class ContentComponent<T extends A, A extends Displayable> {

  @Input()
  public service: EntityService<T, A>;

  constructor() {
  }

  public get items(): A[] {
    return this.service.items;
    // tslint:disable-next-line:triple-equals
    // if (this.searchValue.trim().length == 0) {
    //   return this.bookService.items;
    // }
    // return this.bookService.items.filter(
    //   (book) =>
    //     !isNullOrUndefined(book.title) && book.title.includes(this.searchValue)
    // );
  }
}
