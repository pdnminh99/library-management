import {Injectable} from '@angular/core';
import {BasicUser, EntityService, Loan, ToolbarMode} from '../models/Model';


@Injectable({providedIn: 'root'})
export class LoanService implements EntityService<Loan, Loan> {

  public get isLoanActive(): boolean {
    return this.loan !== undefined;
  }

  constructor() {
  }
  public loans: Loan[] = [];

  public loan: Loan;

  public isProcessing = false;

  isActive: boolean;
  items: Loan[];
  selectedItem: Loan;

  public mode: ToolbarMode = ToolbarMode.STATIC;

  delete(): void {
  }

  get(id: string): void {
  }

  getAll(): void {
  }

  refresh(): void {
  }

  update(patch: Loan): void {
  }
}
