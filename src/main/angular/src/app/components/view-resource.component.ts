import {Component} from '@angular/core';
import {BookService} from '../authentication/book.service';
import {Book, ToolbarMode} from '../models/Model';
import {AuthenticationService} from '../authentication/authentication.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'view-resource-component',
  template: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <mat-progress-bar *ngIf="bookService.isProcessing" mode="query"></mat-progress-bar>
      <toolbar-component
        *ngIf="isStaticMode"
        (onDelete)="handleDeleteEvent()"
        (onCreate)="handleCreateEvent()"
        (onEdit)="handleEditEvent()"
        [service]="bookService"
        style="width: 100%;"></toolbar-component>

      <book-static-display-component
        *ngIf="bookService.isActive && isStaticMode"
        [book]="book"></book-static-display-component>

      <book-form-component
        (onSubmit)="submit($event)"
        (onDiscard)="discard()"
        *ngIf="isCreateMode"
        id="content-detail"></book-form-component>
      <book-form-component
        (onSubmit)="submit($event)"
        (onDiscard)="discard()"
        *ngIf="isEditMode"
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
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient) {
    this.route.params.subscribe(value => {
      if (value.bookId !== undefined) {
        this.bookService.get(value.bookId);
      } else if (this.bookService.items.length > 0) {
        this.router.navigate(['resources', this.bookService.items[0].bookId]).then(() => {
        });
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

  public handleDeleteEvent() {
    this.bookService.delete();
    // if (this.bookService.items.length > 0) {
    //   this.router.navigateByUrl(`resources/${this.bookService.items[0].bookId}`).then(() => {
    //   });
    // } else {
    //   this.router.navigate(['resources']).then(() => {
    //   });
    //   this.bookService.selectedItem = undefined;
    // }
  }

  public submit(book: Book) {
    if (this.auth.currentUser === undefined) {
      return;
    }
    book.creatorId = this.auth.currentUser.userId;
    book.creator = this.auth.currentUser;

    if (this.bookService.mode === ToolbarMode.CREATE) {
      this.bookService.create(book);
    }
    if (this.bookService.mode === ToolbarMode.EDIT) {
      this.bookService.update(book);
    }
    this.bookService.mode = ToolbarMode.STATIC;
  }

  public discard() {
    this.bookService.mode = ToolbarMode.STATIC;
  }
}
