import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Book} from '../models/Model';
import {MetadataService} from '../authentication/metadata.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'book-form-component',
  template: `
    <div id="content-detail">
      <img class="book-cover"
           [src]="displayURL"
           [alt]="book.title">
      <!--      <img class="book-cover"-->
      <!--           *ngIf="book.photoURL == undefined"-->
      <!--           [src]="emptyImage"-->
      <!--           alt="No image found!">-->
      <div id="detail" [formGroup]="bookForm">
        <h1>Book information</h1>
        <div style="display: flex; flex-wrap: wrap;">
          <div style="flex: 1;">
            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Title</mat-label>
              <input matInput formControlName="title">
              <mat-icon matSuffix>title</mat-icon>
            </mat-form-field>

            <br/>

            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Author</mat-label>
              <input matInput formControlName="author" [matAutocomplete]="authorAutocomplete">
              <mat-icon matSuffix>person</mat-icon>
              <mat-hint>Author must not empty!</mat-hint>

              <mat-autocomplete #authorAutocomplete="matAutocomplete">
                <mat-option *ngFor="let author of authors" [value]="author">
                  {{ author }}
                </mat-option>
              </mat-autocomplete>
            </mat-form-field>

            <br/>

            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Year of publishing</mat-label>
              <input matInput
                     type="number"
                     formControlName="yearOfPublishing">
            </mat-form-field>

            <br/>

            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Prefix</mat-label>
              <input matInput type="text" formControlName="prefixId" [matAutocomplete]="prefixAutocomplete">
              <mat-hint>Prefix must be 2 or 3 characters only.</mat-hint>

              <mat-autocomplete #prefixAutocomplete="matAutocomplete">
                <mat-option *ngFor="let prefix of prefixIds" [value]="prefix">
                  {{ prefix }}
                </mat-option>
              </mat-autocomplete>
            </mat-form-field>
          </div>
          <div style="flex: 1; margin-left: 10px;">
            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Genre</mat-label>
              <input matInput formControlName="genre" [matAutocomplete]="genreAutocomplete">
              <mat-hint>Genre must not empty!</mat-hint>

              <mat-autocomplete #genreAutocomplete="matAutocomplete">
                <mat-option *ngFor="let genre of genres" [value]="genre">
                  {{ genre }}
                </mat-option>
              </mat-autocomplete>
            </mat-form-field>

            <br/>

            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Publisher</mat-label>
              <input matInput formControlName="publisher" [matAutocomplete]="publisherAutocomplete">
              <mat-icon matSuffix>location_city</mat-icon>

              <mat-autocomplete #publisherAutocomplete="matAutocomplete">
                <mat-option *ngFor="let publisher of publishers" [value]="publisher">
                  {{ publisher }}
                </mat-option>
              </mat-autocomplete>
            </mat-form-field>

            <br/>

            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Count</mat-label>
              <input matInput type="number" min="0" formControlName="count">
            </mat-form-field>

            <br/>

            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-label>Position</mat-label>
              <input matInput type="text" formControlName="position">
            </mat-form-field>
          </div>
        </div>
        <mat-form-field appearance="outline" style="width: 100%;">
          <mat-label>Cover URL</mat-label>
          <input matInput formControlName="photoURL">
          <mat-icon matSuffix>link</mat-icon>
        </mat-form-field>
        <br/>

        <mat-form-field appearance="outline" style="width: 100%;">
          <mat-label>Description</mat-label>
          <textarea formControlName="description"
                    matInput
                    cdkTextareaAutosize
                    cdkAutosizeMinRows="3"
          ></textarea>
          <mat-icon matSuffix>short_text</mat-icon>
        </mat-form-field>
        <br/>

        <button (click)="handleSubmit(true)" [disabled]="isTheSame || !bookForm.valid" mat-stroked-button>Submit</button>
        <button (click)="handleSubmit(false)" mat-stroked-button style="margin-left: 10px;">Discard</button>
      </div>
    </div>
  `,
  styles: [
      `
      .book-cover {
        flex: 1;
        max-height: 500px;
        max-width: 300px;
        border-radius: 5px;
      }

      #detail {
        flex: 2;
        padding: 0 30px;
      }

      #content-detail {
        margin: 0 10px;
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

        #detail {
          padding: 10px 0;
        }
      }
    `
  ]
})
export class BookFormComponent implements OnInit {

  public get displayURL(): string {
    const photo = this.bookForm.value.photoURL;
    return BookFormComponent.checkURL(photo) ? photo : this.emptyImage;
  }

  public get authors(): string[] {
    return this.getDistinctValues('author');
  }

  public get publishers(): string[] {
    return this.getDistinctValues('publisher');
  }

  public get genres(): string[] {
    return this.getDistinctValues('genre');
  }

  public get prefixIds(): string[] {
    return this.getDistinctValues('prefixId', 'prefixes');
  }

  constructor(public formBuilder: FormBuilder, private metadataService: MetadataService) {
  }

  public get isTheSame(): boolean {
    // tslint:disable-next-line:prefer-const
    let {title, author, description, genre, publisher, yearOfPublishing, count, photoURL} = this.bookForm.value;
    return this.book.title === title &&
      this.book.author === author &&
      this.book.description === description &&
      this.book.genre === genre &&
      this.book.publisher === publisher &&
      this.book.yearOfPublishing === yearOfPublishing &&
      this.book.count === count &&
      this.book.photoURL === photoURL;
  }

  public emptyImage = 'https://thumbs.dreamstime.com/b/black-linear-photo-camera-logo-like-no-image-available-black-linear-photo-camera-logo-like-no-image-available-flat-stroke-style-106031126.jpg';

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onSubmit = new EventEmitter<Book>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onDiscard = new EventEmitter();

  @Input()
  public book: Book = {
    bookId: null,
    title: '',
    author: '',
    subtitle: '',
    genre: '',
    yearOfPublishing: (new Date()).getFullYear(),
    count: 0,
    photoURL: undefined,
    prefixId: '',
    position: '',
    publisher: ''
  } as Book;

  public bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: [''],
    genre: ['', Validators.required],
    publisher: [''],
    yearOfPublishing: [new Date().getFullYear()],
    count: [0],
    photoURL: [''],
    position: [''],
    prefixId: ['', [Validators.maxLength(4), Validators.minLength(3)]]
  });

  public static checkURL(url?: string): boolean {
    return (url?.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  private getDistinctValues(key: string, pluralKey: string = `${key}s`) {
    const value = this.bookForm.value[key].toLowerCase();
    if (value.length === 0) {
      return this.metadataService[pluralKey].slice(0, 10);
    }
    return this.metadataService[pluralKey]
      .filter(a => a.toLowerCase().includes(value));
  }

  ngOnInit(): void {
    this.bookForm.patchValue({
      title: this.book.title,
      author: this.book.author,
      description: this.book.description,
      genre: this.book.genre,
      publisher: this.book.publisher,
      yearOfPublishing: this.book.yearOfPublishing,
      count: this.book.count,
      photoURL: this.book.photoURL,
      prefixId: this.book.prefixId,
      position: this.book.position
    });
  }

  public handleSubmit(containsChanges: boolean) {
    if (!containsChanges) {
      this.onDiscard.emit();
    } else {
      this.onSubmit.emit(this.bookForm.value as Book);
    }
  }
}
