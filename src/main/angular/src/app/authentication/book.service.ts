import {Injectable} from '@angular/core';
import {BasicBook, Book, EntityService, Metadata, ToolbarMode} from '../models/Model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookService implements EntityService<Book, BasicBook> {

  public authors: Metadata[];

  public genres: Metadata[];

  public publishers: Metadata[];

  public get isActive(): boolean {
    return this.selectedItem !== undefined;
  }

  constructor(private http: HttpClient, private router: Router, public firestore: AngularFirestore) {
    this.getAll();
    this.router.events.subscribe(_ => {
      const routes = location.pathname.split('/');
      if (routes[1] === 'resources' && routes.length === 3 && this.selectedItem?.bookId !== routes[2]) {
        this.get(routes[2]);
      }
    });
    this.firestore.collection<Metadata>('metadata_dev', ref => ref
      .limit(10)
      .where('type', '==', 'AUTHOR'))
      .valueChanges()
      .subscribe(v => this.authors = v);
    this.firestore.collection<Metadata>('metadata_dev', ref => ref
      .limit(10)
      .where('type', '==', 'GENRE'))
      .valueChanges()
      .subscribe(v => this.genres = v);
    this.firestore.collection<Metadata>('metadata_dev', ref => ref
      .limit(10)
      .where('type', '==', 'PUBLISHER'))
      .valueChanges()
      .subscribe(v => this.publishers = v);
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
      creator: instance.creator?.userId
    };

    this.http.post(`${environment.serverURI}/book`, req, {
      headers: this.corsHeaders
    }).subscribe(res => {
      console.log(res);
      this.refresh();
    });
  }
}
