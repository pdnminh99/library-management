import {Component, Input} from '@angular/core';
import {Displayable} from '../models/Model';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-list-component',
  template: `

    <div>
      <content-row-component
        style="margin: 2px 0;"
        *ngFor="let item of items"
        [isActive]="false"
        [title]="item.title"
        [description]="item.description"
        [routerLink]="item.navigate"
      ></content-row-component>
    </div>

  `
})
export class ContentListComponent<T extends Displayable> {

  @Input()
  public items: T[] = [];

}
