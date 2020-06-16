import {Injectable} from '@angular/core';
import {BasicBook, Book, EntityService, ToolbarMode} from '../models/Model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService implements EntityService<Book, BasicBook> {

  public get isActive(): boolean {
    return this.selectedItem !== undefined;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.getAll();
    this.router.events.subscribe(_ => {
      const routes = location.pathname.split('/');
      if (routes[1] === 'resources' && routes.length === 3) {
        this.get(routes[2]);
      }
    });
  }

  public isProcessing = false;

  public isCreateMode = false;

  private corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080/api/v1/book',
  });

  public items: BasicBook[] = [];

  public selectedItem: Book;

  public mode: ToolbarMode = ToolbarMode.STATIC;

  public getAll(): void {
    this.isProcessing = true;
    this.http
      .get<BasicBook[]>(`${environment.serverURI}/book`, {
        headers: this.corsHeaders,
      })
      .subscribe((value) => {
        this.items = value.map(v => new BasicBook(v.bookId, v.title, v.author));
        this.isProcessing = false;
      });
  }

  public get(bookId: string) {
    this.isProcessing = true;
    this.http
      .get<Book>(`${environment.serverURI}/book/${bookId}`, {
        headers: this.corsHeaders,
      })
      .subscribe((value) => {
        this.selectedItem = value;
        this.isProcessing = false;
      });
  }

  public refresh() {
    this.getAll();
    if (this.selectedItem !== undefined) {
      this.get(this.selectedItem.bookId);
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
}
