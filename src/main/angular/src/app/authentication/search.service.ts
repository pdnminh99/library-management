import {Injectable} from '@angular/core';
import {BookService} from './book.service';
import {MemberService} from './member.service';
import {LoanService} from './loan.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // tslint:disable-next-line:variable-name
  private _value = '';

  public get value(): string {
    return this._value;
  }

  public set value(newValue: string) {
    this._value = newValue;
  }

  public get isSearchActive(): boolean {
    return this.value.trim().length > 0;
  }

  constructor(private bookService: BookService,
              private memberService: MemberService,
              private loanService: LoanService) {
  }
}
