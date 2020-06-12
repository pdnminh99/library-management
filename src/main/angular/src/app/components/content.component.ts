import {Component} from '@angular/core';
import {Book} from '../models/book';
import {isNullOrUndefined} from 'util';
import {BookService} from '../authentication/book.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-component',
  template: `
    <div style="height: 100%; display: flex;">
      <div id="list-contents">
        <mat-form-field id="mini-searchbar" appearance="fill">
          <input
            matInput
            type="text"
            placeholder="Search"
            [(ngModel)]="searchValue"
          />
          <button matSuffix mat-icon-button>
            <mat-icon>filter_list</mat-icon>
          </button>
        </mat-form-field>

        <div style="overflow-y: auto; flex: 4; display: flex; flex-direction: column; align-items: stretch;">
          <content-row-component
            style="margin: 2px 0;"
            *ngFor="let book of books"
            [isActive]="
              book.resourceId !== null && book.resourceId == currentActiveId
            "
            [title]="book.title"
            [description]="book.description"
          ></content-row-component>
        </div>

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
  styles: [`
    #list-contents {
      flex: 1;
      background-color: transparent;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      border: none;
    }

    @media screen and (max-width: 900px) {
      #list-contents {
        display: none;
      }
    }

  `],
})
export class ContentComponent {
  public searchValue = '';

  public currentActiveId = 0;

  constructor(public bookService: BookService) {
  }


  public get books(): Book[] {
    // tslint:disable-next-line:triple-equals
    if (this.searchValue.trim().length == 0) {
      return this.bookService.books;
    }
    return this.bookService.books.filter(
      (book) =>
        (!isNullOrUndefined(book.title) &&
          book.title.includes(this.searchValue)) ||
        (!isNullOrUndefined(book.description) &&
          book.description.includes(this.searchValue))
    );
  }
}
