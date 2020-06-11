import {Injectable} from '@angular/core';
import {Book} from '../models/Book';


@Injectable({providedIn: 'root'})
export class BookService {

  public books: Book[] = [{
    resourceId: 0,
    title: 'Harry Potter and the Sorcerer Stone',
    description: 'Lorem Ipsum',
  }, {
    resourceId: 1,
    title: 'Harry Potter and the Chamber of Secret',
    description: 'Lorem Ipsum',
  }, {
    resourceId: 2,
    title: 'Harry Potter and the Prisoner of Azkaban',
    description: 'Lorem Ipsum',
  }, {
    resourceId: 3,
    title: 'Harry Potter and the Goblet of Fire',
    description: 'Lorem Ipsum',
  }, {
    resourceId: 4,
    title: 'Harry Potter and the Order of Pheonix',
    description: 'Lorem Ipsum',
  }, {
    resourceId: 5,
    title: 'Harry Potter and the Half Blood Prince',
    description: 'Lorem Ipsum',
  }, {
    resourceId: 6,
    title: 'Harry Potter and the Deathly Hallow part One',
    description: 'Lorem Ipsum',
  }, {
    resourceId: 7,
    title: 'Harry Potter and the Deathly Hallow part Two',
    description: 'Lorem Ipsum',
  }] as Book[];

}
