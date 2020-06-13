import { Component } from "@angular/core";
import { BookService } from "../authentication/book.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "view-resource-component",
  template: `
    <div>
      <toolbar-component></toolbar-component>

      <p *ngIf="bookService.isProcessing">Loading ...</p>
      <div *ngIf="bookService.isBookActive">
        <h1>{{ bookService.book.title || "No content" }}</h1>
        <p>{{ bookService.book.author }}</p>
      </div>
    </div>
  `,
})
export class ViewResourceComponent {
  constructor(public bookService: BookService) {}
}
