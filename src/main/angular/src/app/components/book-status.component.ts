import {Component, Input} from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'book-status-component',
  template: `
    <mat-card style="width: fit-content">
      <mat-card-content style="display: flex; justify-content: start; align-items: center; flex-direction: column;">
        <div style="flex: 1; text-align: center;">{{ title }}</div>
        <div style="flex: 2; font-size: 25px; margin-top: 3px; text-align: center; font-weight: bolder;">{{ content }}</div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [``]
})
export class BookStatusComponent {

  @Input()
  public title: string;

  @Input()
  public content: string;

}
