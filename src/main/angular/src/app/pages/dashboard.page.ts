import {Component} from '@angular/core';
import {BookService} from '../authentication/book.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard-page',
  template: `
    <div style="display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap;">

      <book-card-showcase-component
        *ngFor="let book of books.items"
        [book]="book"
        style="margin: 0 10px;"
      ></book-card-showcase-component>

    </div>`,
})
// tslint:disable-next-line:component-class-suffix
export class DashboardPage {

  constructor(public books: BookService) {
  }


}
