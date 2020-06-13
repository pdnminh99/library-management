import { Injectable } from "@angular/core";
import { BasicBook, Book } from "../models/Model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class BookService {
  public books: BasicBook[] = [];

  public book: Book;

  public get isBookActive(): boolean {
    return this.book !== undefined;
  }

  public isProcessing = false;

  private corsHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8080/api/v1/book",
  });

  constructor(private http: HttpClient) {
    this.isProcessing = true;
    http
      .get<BasicBook[]>(`${environment.serverURI}/book`, {
        headers: this.corsHeaders,
      })
      .subscribe({
        next: (value) => {
          this.books = value;
          this.isProcessing = false;
        },
        complete() {
          console.log("Completed sync");
        },
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
        console.log(value);
        this.isProcessing = false;
      });
  }
}
