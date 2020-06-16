import {Injectable} from '@angular/core';
import {EntityService, Filter, Loan, ToolbarMode} from '../models/Model';


@Injectable({
  providedIn: 'root'
})
export class LoanService implements EntityService<Loan> {

  constructor() {
  }

  public isProcessing = false;

  isActive: boolean;

  items: Loan[] = [];

  selectedItem: Loan;

  public mode: ToolbarMode = ToolbarMode.STATIC;

  filters: Filter[];

  selectedFilter: Filter;

  public pageNumber = 0;

  public pageSize = 10;

  delete(): void {
  }

  get(id: string): void {
  }

  getAll(): void {
  }

  update(patch: Loan): void {
  }

  create(instance: Loan): void {
  }

  onSearch(key: string): void {
  }

  apply(filter: Filter): void {
  }

  pageTurn(page: number): void {
  }
}
