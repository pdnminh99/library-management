import {Injectable} from '@angular/core';
import {Book, EntityService, Filter, Metadata, ToolbarMode} from '../models/Model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {MemberService} from './member.service';

@Injectable({
  providedIn: 'root'
})
export class BookService implements EntityService<Book> {

  public get isActive(): boolean {
    return this.selectedItem !== undefined;
  }

  constructor(private http: HttpClient,
              private firestore: AngularFirestore,
              public memberService: MemberService) {
    this.getAll();
    this.firestore.collection<Metadata>('metadata_dev', ref => ref
      .where('type', '==', 'AUTHOR'))
      .valueChanges()
      .subscribe(v => this.authors = v);
    this.firestore.collection<Metadata>('metadata_dev', ref => ref
      .where('type', '==', 'GENRE'))
      .valueChanges()
      .subscribe(v => this.genres = v);
    this.firestore.collection<Metadata>('metadata_dev', ref => ref
      .where('type', '==', 'PUBLISHER'))
      .valueChanges()
      .subscribe(v => this.publishers = v);
  }

  public get items(): Book[] {
    if (this.currentKey.length === 0) {
      return this._items.slice(this.pageNumber * this.pageSize > 0 ? this.pageNumber * this.pageSize - 1 : 0, this.pageSize);
    }
    const key = this.currentKey.toLowerCase();
    return this._items.filter(item => {
      return item.title?.toLowerCase().includes(key) || item.creatorInstance?.displayName?.toLowerCase().includes(key) ||
        item.genre?.toLowerCase().includes(key) || item.publisher?.toLowerCase().includes(key) || item.author?.toLowerCase().includes(key);
    }).slice(this.pageNumber * this.pageSize > 0 ? this.pageNumber * this.pageSize - 1 : 0, this.pageSize);
  }

  public authors: Metadata[];

  public genres: Metadata[];

  public publishers: Metadata[];

  private currentKey = '';

  public isProcessing = false;

  private corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080/api/v1/book',
  });

  // tslint:disable-next-line:variable-name
  public _items: Book[] = [];

  public get len(): number {
    return this._items.length;
  }

  // tslint:disable-next-line:variable-name
  public selectedItem: Book;

  public mode: ToolbarMode = ToolbarMode.STATIC;

  public filters: Filter[] = [
    {
      filterId: 0,
      description: 'All',
      icon: undefined
    }, {
      filterId: 1,
      description: 'Almost out of stock',
      icon: 'priority_high'
    }, {
      filterId: 2,
      description: 'Out of stock',
      icon: 'warning'
    }];

  selectedFilter: Filter = this.filters[0];

  public pageNumber = 0;

  public pageSize = 10;

  public getAll(): void {
    this.isProcessing = true;
    this.firestore.collection<Book>('books_dev')
      .snapshotChanges()
      .subscribe(value => {
        const data = value.map(v => v.payload.doc);
        this._items = data.map(v => {
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
            v.data().creator,
            undefined);
        });
        this.isProcessing = false;
      });
  }

  public get(bookId: string) {
    for (const book of this.items) {
      if (book.bookId === bookId) {
        this.selectedItem = book;
        for (const member of this.memberService.items) {
          if (this.selectedItem.creator === member.userId) {
            this.selectedItem.creatorInstance = member;
            break;
          }
        }
        break;
      }
    }
  }

  public delete() {
    if (this.selectedItem === undefined) {
      return;
    }
    const bookIdToRemove = this.selectedItem.bookId;
    this.http.delete(`${environment.serverURI}/book/${bookIdToRemove}`, {
      headers: this.corsHeaders,
    })
      .subscribe(_ => {
        this.selectedItem = undefined;
        for (let index = 0; index < this.items.length; index++) {
          if (this.items[index].bookId === bookIdToRemove) {
            this.items.splice(index, 1);
          }
        }
      });
  }

  public update(newVersion: Book) {
  }

  public create(instance: Book): void {
    const req = {
      title: instance.title,
      author: instance.author,
      description: instance.description,
      genre: instance.genre,
      publisher: instance.publisher,
      yearOfPublishing: instance.yearOfPublishing,
      count: instance.count,
      photoURL: instance.photoURL,
      creator: instance.creator
    };

    this.http.post(`${environment.serverURI}/book`, req, {
      headers: this.corsHeaders
    }).subscribe(res => {
    });
  }

  public onSearch(key: string): void {
    this.currentKey = key;
  }

  public apply(filter: Filter): void {
  }

  public pageTurn(page: number): void {
    this.pageNumber = page;
  }
}
