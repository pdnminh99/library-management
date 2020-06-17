import {Component, OnInit} from '@angular/core';
import {LoanService} from '../authentication/loan.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'book-loans-page',
  template: `
    <content-component (onSearch)="loanService.onSearch($event)"
                       (onPageTurn)="loanService.pageTurn($event.pageIndex)"
                       (onFilterApply)="loanService.apply($event)"
                       [service]="loanService"
    ></content-component>
  `
})
// tslint:disable-next-line:component-class-suffix
export class BookLoansPage implements OnInit {

  constructor(public loanService: LoanService) {
  }

  ngOnInit(): void {
    this.loanService.onSearch('');
  }
}
