import { Component, Input } from "@angular/core";
import { Book } from "../models/Model";
import { BookFormComponent } from "./book-form.component";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "book-static-display-component",
  template: `
    <div id="content-detail">
      <img
        class="book-cover"
        [src]="displayImage"
        [alt]="displayImage"
        (error)="isImageFailed = true"
      />
      <div id="detail">
        <h1 style="font-weight: bolder">{{ book.title || "No content" }}</h1>

        <div *ngIf="book.creator !== undefined" style="margin-bottom: 10px;">
          <p>Added on {{ createdAtDisplay }} by</p>
          <div
            style="display: flex; align-items: center; justify-content: flex-start;"
          >
            <img
              style="width: 40px; border-radius: 50px; margin-right: 10px;"
              [src]="book.creator.photoURL"
              [alt]="book.creator.photoURL"
            />
            <p style="font-weight: bold; margin: 0;">
              {{ book.creator.displayName }}
            </p>
          </div>
        </div>

        <hr />
        <p style="text-align: justify">{{ book.description }}</p>

        <div style="display: flex; flex-wrap: wrap;">
          <book-status-component
            *ngIf="book.author?.length > 0"
            style="margin: 3px 5px;"
            title="Author"
            [content]="book.author"
          ></book-status-component>
          <book-status-component
            *ngIf="book.count?.toString()?.length > 0"
            style="margin: 0 5px;"
            title="Count"
            [content]="book.count.toString()"
          ></book-status-component>
          <book-status-component
            *ngIf="book.genre?.length > 0"
            style="margin: 0 5px;"
            title="Genre"
            [content]="book.genre"
          ></book-status-component>
          <book-status-component
            *ngIf="book.publisher?.length > 0"
            style="margin: 0 5px;"
            title="Publisher"
            [content]="book.publisher"
          ></book-status-component>
          <book-status-component
            *ngIf="book.yearOfPublishing?.toString()?.length > 0"
            style="margin: 0 5px;"
            title="Year"
            [content]="book.yearOfPublishing.toString()"
          ></book-status-component>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .book-cover {
        flex: 1;
        max-height: 500px;
        max-width: 300px;
        border-radius: 5px;
      }

      #content-detail {
        height: 100%;
        margin: 10px;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        width: 100%;
        overflow-y: auto;
      }

      #detail {
        flex: 2;
        padding: 0 30px;
      }

      @media screen and (max-width: 1024px) {
        #content-detail {
          flex-direction: column;
          align-items: center;
        }

        #detail {
          padding: 10px 0;
        }
      }
    `,
  ],
})
export class BookStaticDisplayComponent {
  @Input()
  public book: Book;

  public get createdAtDisplay(): string {
    return this.book.createdAt.toDate().toUTCString();
  }

  public isImageFailed = false;

  public get displayImage(): string {
    return this.isImageFailed
      ? "https://thumbs.dreamstime.com/b/black-linear-photo-camera-logo-like-no-image-available-black-linear-photo-camera-logo-like-no-image-available-flat-stroke-style-106031126.jpg"
      : this.book.photoURL ?? "";
  }
}
