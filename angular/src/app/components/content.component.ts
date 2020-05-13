import { Component } from "@angular/core";
import { Book } from "../models/book";
import { isNullOrUndefined } from "util";

@Component({
  selector: "content-component",
  template: `
    <mat-sidenav-container style="height: 100%;">
      <mat-sidenav
        [opened]="true"
        mode="side"
        style="background-color: transparent; border: none; width: 300px;"
      >
        <mat-form-field style="padding: 0; width: 100%;" appearance="fill">
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
        <div style="height: 500px; overflow-y: auto;">
          <content-row-component
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
          style="width: 100%; background-color: transparent; text-align: left;"
        ></mat-paginator>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar
          style="bottom: 0; position: relative; border-top: solid black 1px; border-bottom: solid black 1px;"
        >
          <button mat-flat-button style="margin-right: 10px;">
            <mat-icon>add_circle_outline</mat-icon> Create
          </button>
          <button mat-flat-button style="margin-right: 10px;">
            <mat-icon>create</mat-icon> Edit
          </button>
          <button mat-flat-button style="margin-right: 10px;">
            <mat-icon>delete</mat-icon> Delete
          </button>
          <button mat-flat-button style="margin-right: 10px;">
            <mat-icon>refresh</mat-icon> Refresh
          </button>
        </mat-toolbar>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [``],
})
export class ContentComponent {
  public searchValue: string = "";

  public currentActiveId: number = 0;

  public get books(): Book[] {
    if (this.searchValue.trim().length == 0) {
      return this._books;
    }
    return this._books.filter(
      (book) =>
        (!isNullOrUndefined(book.title) &&
          book.title.includes(this.searchValue)) ||
        (!isNullOrUndefined(book.description) &&
          book.description.includes(this.searchValue))
    );
    // let results: Book[] = [];
    // for (var book of this._books) {
    //   if (
    //     !isNullOrUndefined(book.title) &&
    //     book.title.includes(this.searchValue)
    //   ) {
    //     results.push(book);
    //   }
    // }
    // return results;
  }

  private _books: Book[] = <Book[]>[
    {
      resourceId: 0,
      title: "Harry Potter and the Sorcerer Stone",
      description: "Lorem Ipsum",
    },
    {
      resourceId: 1,
      title: "Harry Potter and the Chamber of Secret",
      description: "Lorem Ipsum",
    },
    {
      resourceId: 2,
      title: "Harry Potter and the Prisoner of Azkaban",
      description: "Lorem Ipsum",
    },
    {
      resourceId: 3,
      title: "Harry Potter and the Goblet of Fire",
      description: "Lorem Ipsum",
    },
    {
      resourceId: 4,
      title: "Harry Potter and the Order of Pheonix",
      description: "Lorem Ipsum",
    },
    {
      resourceId: 5,
      title: "Harry Potter and the Half Blood Prince",
      description: "Lorem Ipsum",
    },
    {
      resourceId: 6,
      title: "Harry Potter and the Deathly Hallow part One",
      description: "Lorem Ipsum",
    },
    {
      resourceId: 7,
      title: "Harry Potter and the Deathly Hallow part Two",
      description: "Lorem Ipsum",
    },
  ];
}
