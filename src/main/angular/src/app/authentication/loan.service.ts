import {Injectable} from '@angular/core';
import {Book, EntityService, Filter, Loan, ToolbarMode} from '../models/Model';
import {AuthenticationService} from './authentication.service';
import {BookService} from './book.service';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {MemberService} from './member.service';


@Injectable({
  providedIn: 'root'
})
export class LoanService implements EntityService<Loan> {
  private currentKey = '';

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private memberService: MemberService,
    private auth: AuthenticationService,
    private bookService: BookService) {
    this.getAll();
  }

  public isProcessing = false;

  public get isActive(): boolean {
    return this.selectedItem !== undefined;
  }

  // tslint:disable-next-line:variable-name
  private _items: Loan[] = [];

  public get items(): Loan[] {
    return this._items;
  }

  public selectedItem: Loan;

  public mode: ToolbarMode = ToolbarMode.STATIC;

  public filters: Filter[] = [{
    filterId: 0,
    description: 'All',
    icon: undefined
  }, {
    filterId: 1,
    description: 'Safe',
    icon: undefined
  }, {
    filterId: 2,
    description: 'Almost late',
    icon: undefined
  }, {
    filterId: 3,
    description: 'Late',
    icon: undefined
  }, {
    filterId: 4,
    description: 'Returned',
    icon: undefined
  }];

  public selectedFilter: Filter = this.filters[0];

  public pageNumber = 0;

  public pageSize = 10;

  public get len(): number {
    return this._items?.length ?? 0;
  }

  delete(): void {
  }

  get(id: string): void {
    for (const loan of this.items) {
      if (loan.loanId === id) {
        this.selectedItem = loan;
        return;
      }
    }
    this.firestore.collection<Loan>('loans')
      .doc(id)
      .get()
      .subscribe(value => {
        this.selectedItem = value.data() as Loan;
        this.selectedItem.loanId = value.id;
      });
  }

  getAll(): void {
    this.isProcessing = true;
    this.firestore.collection<Loan>('loans')
      .snapshotChanges()
      .subscribe(value => {
        const data = value.map(v => v.payload.doc);
        this._items = data.map(v => {
          return new Loan(
            v.id,
            v.data().title,
            v.data().description,
            v.data().displayName,
            v.data().email,
            v.data().civilianId,
            v.data().address,
            v.data().gender,
            v.data().deadline,
            v.data().returnedAt,
            v.data().books,
            v.data().createdAt);
        });
        this.isProcessing = false;
      });
  }

  update(patch: Loan): void {
  }

  create(instance: Loan): void {
  }

  onSearch(key: string): void {
    this.currentKey = key;
  }

  apply(filter: Filter): void {
    this.selectedFilter = filter;
  }

  pageTurn(page: number): void {
    this.pageNumber = page;
  }
}
