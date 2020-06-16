import {Component} from '@angular/core';
import {BookService} from '../authentication/book.service';
import {Book, ToolbarMode} from '../models/Model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'view-resource-component',
  template: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <toolbar-component
        (onRefresh)="bookService.refresh()"
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
                           id="content-detail"></book-form-component>
      <book-form-component (onDiscard)="discard()"
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

  constructor(public bookService: BookService) {
  }

  public handleCreateEvent() {
    this.bookService.mode = ToolbarMode.CREATE;
  }

  public handleEditEvent() {
    this.bookService.mode = ToolbarMode.EDIT;
  }

  public submit(book: Book) {
    console.log(book);
    this.bookService.mode = ToolbarMode.STATIC;
  }

  public discard() {
    this.bookService.mode = ToolbarMode.STATIC;
  }
}
