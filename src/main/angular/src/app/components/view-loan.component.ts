import {Component} from '@angular/core';
import {ToolbarMode} from '../models/Model';
import {ActivatedRoute, Router} from '@angular/router';
import {LoanService} from '../authentication/loan.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'view-member-component',
  template: `
    <div>
      <loan-toolbar-component
        (onCreate)="handleOnCreate()"
        (onEdit)="handleOnEdit()"
        (onDelete)="handleOnDelete()"
        (onReturn)="handleOnReturn()"
        [service]="loanService"
      ></loan-toolbar-component>

      <loan-form-component></loan-form-component>
    </div>
  `
})
export class ViewLoanComponent {

  constructor(public loanService: LoanService,
              public route: ActivatedRoute,
              public router: Router) {
    this.route.params.subscribe(value => {
      if (value.loanId !== undefined) {
        this.loanService.get(value.memberId);
      } else if (this.loanService.items.length > 0) {
        this.router.navigate(['loans', this.loanService.items[0].loanId]).then(() => {
        });
      } else {
        this.loanService.selectedFilter = undefined;
      }
    });
  }

  public handleOnCreate() {
    this.loanService.mode = ToolbarMode.CREATE;
  }

  public handleOnEdit() {
    this.loanService.mode = ToolbarMode.EDIT;
  }

  public handleOnDelete() {
    this.loanService.delete();
  }

  public handleOnReturn() {
    this.loanService.returnResources();
  }
}
