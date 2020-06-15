import { Component } from "@angular/core";
import {LoanService} from '../authentication/loan.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: "book-loans-page",
  template: `
    <content-component [service]="loanService"></content-component>
  `
})
// tslint:disable-next-line:component-class-suffix
export class BookLoansPage {

  constructor(public loanService: LoanService) {
  }
}
