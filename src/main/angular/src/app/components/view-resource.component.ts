import {Component} from '@angular/core';
import {BookService} from '../authentication/book.service';
import {Book, ToolbarMode} from '../models/Model';
import {AuthenticationService} from '../authentication/authentication.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'view-resource-component',
  template: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <toolbar-component
        (onDelete)="bookService.delete()"
        (onCreate)="handleCreateEvent()"
        (onEdit)="handleEditEvent()"
        [service]="bookService"
        style="width: 100%;"></toolbar-component>

      <book-static-display-component
        *ngIf="bookService.isActive && isStaticMode"
        [book]="book"></book-static-display-component>

      <book-form-component (onSubmit)="submit($event)"
                           *ngIf="isCreateMode"
                           [genres]="genres"
                           [authors]="authors"
                           [publishers]="publishers"
                           id="content-detail"></book-form-component>
      <book-form-component (onDiscard)="discard()"
                           *ngIf="isEditMode"
                           [genres]="genres"
                           [authors]="authors"
                           [publishers]="publishers"
                           [book]="book"
                           id="content-detail"></book-form-component>
    </div>
  `,
  styles: [`
    #content-detail {
      margin: 10px;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      width: 100%;
      overflow-y: auto;
    }

    @media screen and (max-width: 1024px) {
      #content-detail {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class ViewResourceComponent {

  public get authors(): string[] {
    return this.bookService.authors.map(a => a.name);
  }

  public get publishers(): string[] {
    return this.bookService.publishers.map(a => a.name);
  }

  public get genres(): string[] {
    return this.bookService.genres.map(a => a.name);
  }

  public get book(): Book {
    return this.bookService.selectedItem;
  }

  public get isCreateMode(): boolean {
    return this.bookService.mode === ToolbarMode.CREATE;
  }

  public get isEditMode(): boolean {
    return this.bookService.mode === ToolbarMode.EDIT;
  }

  public get isStaticMode(): boolean {
    return this.bookService.mode === ToolbarMode.STATIC;
  }

  constructor(
    public bookService: BookService,
    public auth: AuthenticationService,
    public route: ActivatedRoute,
    public http: HttpClient) {
    this.route.params.subscribe(value => {
      console.log(value.bookId);
      if (value.bookId !== undefined) {
        this.bookService.get(value.bookId);
      } else {
        this.bookService.selectedItem = undefined;
      }
    });
  }

  public handleCreateEvent() {
    this.bookService.mode = ToolbarMode.CREATE;
  }

  public handleEditEvent() {
    this.bookService.mode = ToolbarMode.EDIT;
  }

  public submit(book: Book) {
    if (this.auth.currentUser === undefined) {
      return;
    }
    book.creator = this.auth.currentUser.userId;
    book.creatorInstance = this.auth.currentUser;

    this.bookService.create(book);
    this.bookService.mode = ToolbarMode.STATIC;
  }

  public discard() {
    this.bookService.mode = ToolbarMode.STATIC;
  }
}
