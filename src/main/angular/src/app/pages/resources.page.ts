import {Component, OnInit} from '@angular/core';
import {BookService} from '../authentication/book.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'resource-page',
  template: `
    <content-component (onSearch)="bookService.onSearch($event)"
                       (onFilterApply)="bookService.apply($event)"
                       (onPageTurn)="bookService.pageTurn($event.pageIndex)"
                       [service]="bookService"
    ></content-component>
  `
})
// tslint:disable-next-line:component-class-suffix
export class ResourcePage implements OnInit {

  constructor(public bookService: BookService) {
  }

  ngOnInit(): void {
    this.bookService.onSearch('');
  }
}
