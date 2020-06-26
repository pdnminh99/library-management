import {Component, Input} from '@angular/core';
import {Displayable} from '../models/Model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-list-component',
  template: `
    <div>
      <content-row-component
        style="margin-bottom: 5px;"
        *ngFor="let item of items"
        [isActive]="item.isActive"
        [title]="item.title"
        [description]="item.subtitle"
        [status]="item.status"
        [routerLink]="item.navigate"
        [routerLinkActive]="item.navigate"
      ></content-row-component>
    </div>
  `
})
export class ContentListComponent<T extends Displayable> {

  @Input()
  public items: T[] = [];

}
