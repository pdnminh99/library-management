import {Injectable} from '@angular/core';
import {BasicBook, Book} from '../models/Model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class BookService {
  public books: BasicBook[] = [];

  public book: Book;

  public get isBookActive(): boolean {
    return this.book !== undefined;
  }

  public isProcessing = false;

  private corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080/api/v1/book',
  });

  constructor(private http: HttpClient, private router: Router) {
    this.isProcessing = true;
    http
      .get<BasicBook[]>(`${environment.serverURI}/book`, {
        headers: this.corsHeaders,
      })
      .subscribe((value) => {
        this.books = value.map(v => new BasicBook(v.bookId, v.title, v.author));
        this.isProcessing = false;
      });
    this.router.events.subscribe(_ => {
      const routes = location.pathname.split('/');
      if (routes[1] === 'resources' && routes.length === 3) {
        this.getBook(routes[2]);
      }
    });
  }

  public getBook(bookId: string) {
    this.isProcessing = true;
    this.http
      .get<Book>(`${environment.serverURI}/book/${bookId}`, {
        headers: this.corsHeaders,
      })
      .subscribe((value) => {
        this.book = value;
        this.isProcessing = false;
      });
  }
}
