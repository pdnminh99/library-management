import { Component, Input } from "@angular/core";
import { Book } from "../models/Model";
import { BookFormComponent } from "./book-form.component";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "book-card-showcase-component",
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ book.title.slice(0, 30) }}</mat-card-title>
        <mat-card-subtitle>{{ book.subtitle.slice(0, 100) }}</mat-card-subtitle>
      </mat-card-header>
      <img
        style="max-width: 200px; max-height: 200px;"
        [src]="displayImage"
        [alt]="displayImage"
        (error)="isImageFailed = true"
      />
      <mat-card-content>
        <p>{{ book.description }}</p>
      </mat-card-content>
    </mat-card>
  `,
})
export class BookCardShowcaseComponent {
  public isImageFailed = false;

  public get displayImage(): string {
    return this.isImageFailed
      ? "https://thumbs.dreamstime.com/b/black-linear-photo-camera-logo-like-no-image-available-black-linear-photo-camera-logo-like-no-image-available-flat-stroke-style-106031126.jpg"
      : this.book.photoURL ?? "";
  }

  @Input()
  public book: Book;
}
