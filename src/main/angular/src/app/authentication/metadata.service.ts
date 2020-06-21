import {Injectable} from '@angular/core';
import {BookService} from './book.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';


@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  public get authors(): string[] {
    return this.getDistinctValues('author');
  }

  public get publishers(): string[] {
    return this.getDistinctValues('publisher');
  }

  public get genres(): string[] {
    return this.getDistinctValues('genre');
  }

  public get prefixes(): string[] {
    return this.getDistinctValues('prefixId');
  }

  private getDistinctValues(key: string): string[] {
    const sets: string[] = [];
    this.bookService._items
      .map(i => i[key])
      .filter(isNotNullOrUndefined)
      .forEach(i => {
        if (sets.includes(i)) {
          return;
        }
        sets.push(i);
      });
    return sets;
  }

  constructor(private bookService: BookService) {
  }

}
