import {Component} from '@angular/core';
import {BookService} from '../authentication/book.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard-page',
  template: `
    <div style="display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap;">

      <book-card-showcase-component
        (click)="route(book.bookId)"
        *ngFor="let book of books.items"
        [book]="book"
        style="margin: 0 10px;"
      ></book-card-showcase-component>

    </div>`,
})
// tslint:disable-next-line:component-class-suffix
export class DashboardPage {

  constructor(public books: BookService,
              public router: Router) {
  }

  public route(navigate: string) {
    this.router.navigate(['resources', navigate]).then(r => {
    });
  }

}
