import {Injectable} from '@angular/core';
import {BasicUser, Loan} from '../models/Model';


@Injectable({providedIn: 'root'})
export class LoanService {
  public loans: Loan[] = [];

  public loan: Loan;

  public get isLoanActive(): boolean {
    return this.loan !== undefined;
  }

  public isProcessing = false;

  constructor() {
  }

  public getLoan(loanId: string) {
  }
}
