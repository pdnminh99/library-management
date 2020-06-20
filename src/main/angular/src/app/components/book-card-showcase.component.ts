import {Component, Input} from '@angular/core';
import {Book} from '../models/Model';
import {BookFormComponent} from './book-form.component';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'book-card-showcase-component',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ book.title }}</mat-card-title>
        <mat-card-subtitle>{{ book.subtitle }}</mat-card-subtitle>
      </mat-card-header>
      <img style="max-width: 200px; max-height: 200px;" [src]="displayURL" [alt]="displayURL">
      <mat-card-content>
        <p>{{ book.description }}</p>
      </mat-card-content>
    </mat-card>
  `
})
export class BookCardShowcaseComponent {

  public emptyImage = 'https://thumbs.dreamstime.com/b/black-linear-photo-camera-logo-like-no-image-available-black-linear-photo-camera-logo-like-no-image-available-flat-stroke-style-106031126.jpg';

  public get displayURL(): string {
    const photo = this.book.photoURL;
    return BookFormComponent.checkURL(photo) ? photo : this.emptyImage;
  }

  @Input()
  public book: Book;

}
