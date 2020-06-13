import { Component, Input } from "@angular/core";
import { Book } from '../models/Model';

@Component({
  selector: "book-details-component",
  template: `
    <div style="width: 100%; height: 100%;">
      <h1>{{ book.title }}</h1>
      <p>{{ book.description }}</p>
    </div>
  `,
})
export class BookDetailsComponent {
  @Input()
  public book: Book;
}
