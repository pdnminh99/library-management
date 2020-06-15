import {Component} from '@angular/core';
import {BookService} from '../authentication/book.service';
import {Router} from '@angular/router';
import {BasicBook} from '../models/Model';
import {isNullOrUndefined} from 'util';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'resource-page',
  template: `
    <content-component [service]="bookService"></content-component>
  `
})
// tslint:disable-next-line:component-class-suffix
export class ResourcePage {

  constructor(public bookService: BookService) {
  }
}
