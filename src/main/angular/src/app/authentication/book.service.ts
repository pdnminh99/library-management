import {Injectable} from '@angular/core';
import {
  Book,
  DisplayColor,
  EntityService,
  Filter,
  ToolbarMode,
} from '../models/Model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {MemberService} from './member.service';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class BookService implements EntityService<Book> {
  public get isActive(): boolean {
    return this.selectedItem !== undefined;
  }

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private router: Router,
    public memberService: MemberService,
    public auth: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.getAll();
  }

  public get items(): Book[] {
    if (this.currentKey.length === 0) {
      return this._items
        .filter((value) =>
          BookService.filterByFilterMethod(this.selectedFilter.filterId, value)
        )
        .slice(
          this.pageNumber * this.pageSize > 0
            ? this.pageNumber * this.pageSize - 1
            : 0,
          this.pageSize
        )
        .map(b => {
          b.isActive = b.bookId === this.selectedItem?.bookId;
          return b;
        });
    }
    return this._items
      .filter((i) => this.filterByKey(this.currentKey, i))
      .filter((value) =>
        BookService.filterByFilterMethod(this.selectedFilter.filterId, value)
      )
      .slice(
        this.pageNumber * this.pageSize > 0
          ? this.pageNumber * this.pageSize - 1
          : 0,
        this.pageSize
      )
      .map(b => {
        b.isActive = b.bookId === this.selectedItem?.bookId;
        return b;
      });
  }

  public get len(): number {
    return this._items.length;
  }

  private currentKey = '';

  public isProcessing = false;

  private corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080/api/v1/book',
  });

  // tslint:disable-next-line:variable-name
  public _items: Book[] = [];

  // tslint:disable-next-line:variable-name
  public selectedItem: Book;

  public mode: ToolbarMode = ToolbarMode.STATIC;

  public filters: Filter[] = [
    {
      filterId: 0,
      description: 'All',
      icon: undefined,
    },
    {
      filterId: 1,
      description: 'Almost out of stock',
      icon: 'priority_high',
    },
    {
      filterId: 2,
      description: 'Out of stock',
      icon: 'warning',
    },
  ];

  selectedFilter: Filter = this.filters[0];

  public pageNumber = 0;

  public pageSize = 10;

  private static filterByFilterMethod(index: number, value: Book) {
    switch (index) {
      case 1:
        return value.status.color === DisplayColor.PRIMARY;
      case 2:
        return value.status.color === DisplayColor.WARN;
      case 0:
      default:
        return true;
    }
  }

  public filterByKey(key: string, item: Book): boolean {
    key = key.toLowerCase();

    return (
      item.title?.toLowerCase().includes(key) ||
      item.creator?.displayName?.toLowerCase().includes(key) ||
      item.genre?.toLowerCase().includes(key) ||
      item.publisher?.toLowerCase().includes(key) ||
      item.author?.toLowerCase().includes(key)
    );
  }

  public getAll(): void {
    this.isProcessing = true;
    this.firestore
      .collection<Book>('books')
      .snapshotChanges()
      .subscribe((value) => {
        const data = value.map((v) => v.payload.doc);
        this._items = data.map((v) => {
          return new Book(
            v.id,
            v.data().title,
            v.data().author,
            v.data().description,
            v.data().genre,
            v.data().publisher,
            v.data().yearOfPublishing,
            v.data().count,
            v.data().photoURL,
            v.data().createdAt,
            v.data().creatorId,
            undefined,
            v.data().prefixId,
            v.data().position
          );
        });
        if (this.selectedItem !== undefined && this.selectedItem !== null) {
          for (const item of this._items) {
            if (item.bookId === this.selectedItem.bookId) {
              this.selectedItem = item;
              break;
            }
          }

          for (const member of this.memberService.items) {
            if (this.selectedItem.creatorId === member.userId) {
              this.selectedItem.creator = member;
              break;
            }
          }
        }
        this.isProcessing = false;
      });
  }

  public get(bookId: string) {
    for (const book of this.items) {
      if (book.bookId === bookId) {
        this.selectedItem = book;
        for (const member of this.memberService.items) {
          if (this.selectedItem.creatorId === member.userId) {
            this.selectedItem.creator = member;
            break;
          }
        }
        return;
      }
    }
    this.firestore
      .collection<Book>('books')
      .doc(bookId)
      .get()
      .subscribe((value) => {
        this.selectedItem = value.data() as Book;
        this.selectedItem.bookId = value.id;
        for (const member of this.memberService.items) {
          if (this.selectedItem.creatorId === member.userId) {
            this.selectedItem.creator = member;
            break;
          }
        }
      });
  }

  public delete() {
    if (this.selectedItem === undefined || !this.auth.isLoggedIn) {
      return;
    }
    this.isProcessing = true;
    const bookIdToRemove = this.selectedItem.bookId;
    this.http
      .delete(
        `${environment.serverURI}/book/${bookIdToRemove}/${this.auth.currentUser.userId}`,
        {
          headers: this.corsHeaders,
        }
      )
      .subscribe({
        next: (_) => {
          for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].bookId === bookIdToRemove) {
              this.items.splice(index, 1);
            }
          }
          this.isProcessing = false;
          this.snackBar.open(
            `Successfully delete title ${this.selectedItem.title}`,
            'Close',
            {
              duration: 5000,
            }
          );
          this.selectedItem = undefined;

          if (this.items.length > 0) {
            this.router
              .navigate(['resources', this.items[0].bookId])
              .then(() => {
                this.selectedItem = this.items[0];
              });
          } else {
            this.selectedItem = undefined;
            this.router.navigate(['resources']).then(() => {
            });
          }
        },
        error: (_) => {
          this.isProcessing = false;
          this.snackBar.open(
            `An error has occurred while trying to delete ${this.selectedItem.title}`,
            'Close',
            {
              duration: 5000,
            }
          );
        },
      });
  }

  public update(instance: Book) {
    const req = {
      bookId: instance.bookId,
      title: instance.title,
      author: instance.author,
      genre: instance.genre,
      publisher: instance.publisher,
      yearOfPublishing: instance.yearOfPublishing,
      photoURL: instance.photoURL,
      description: instance.description,
      prefixId: instance.prefixId?.toUpperCase(),
      count: instance.count,
      position: instance.position,
    };

    this.isProcessing = true;

    this.http
      .patch(
        `${environment.serverURI}/book/${this.auth.currentUser.userId}`,
        req,
        {
          headers: this.corsHeaders,
        }
      )
      .subscribe({
        next: (_) => {
          this.isProcessing = false;
          this.snackBar.open(`Update successfully.`, 'Close', {
            duration: 5000,
          });
        },
        error: (_) => {
          this.isProcessing = false;
          this.snackBar.open(
            `An error has occurred while trying to update "${this.selectedItem.title}".`,
            'Close',
            {
              duration: 5000,
            }
          );
        },
      });
  }

  public create(instance: Book): void {
    if (this.auth.currentUser === undefined) {
      return;
    }

    const req = {
      title: instance.title,
      author: instance.author,
      genre: instance.genre,
      publisher: instance.publisher,
      yearOfPublishing: instance.yearOfPublishing,
      photoURL: instance.photoURL,
      description: instance.description,
      prefixId: instance.prefixId?.toUpperCase(),
      count: instance.count,
      position: instance.position,
    };

    this.isProcessing = true;
    this.http
      .post(
        `${environment.serverURI}/book/${this.auth.currentUser.userId}`,
        req,
        {
          headers: this.corsHeaders,
        }
      )
      .subscribe({
        next: (_) => {
          this.isProcessing = false;
          this.snackBar.open(`Title create successfully.`, 'Close', {
            duration: 5000,
          });
        },
        error: (_) => {
          this.isProcessing = false;
          this.snackBar.open(
            `An error has occurred while trying to create book.`,
            'Close',
            {
              duration: 5000,
            }
          );
        },
      });
  }

  public onSearch(key: string): void {
    this.currentKey = key;
  }

  public apply(filter: Filter): void {
    this.selectedFilter = filter;
  }

  public pageTurn(page: number): void {
    this.pageNumber = page;
  }
}
