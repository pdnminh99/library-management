import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Displayable, EntityService, Filter} from '../models/Model';
import {PageEvent} from '@angular/material/paginator';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-component',
  template: `
    <div style="height: 100%; display: flex;">
      <div id="left-panel">
        <mat-form-field id="mini-searchbar" appearance="fill">
          <input
            (keyup.enter)="onSearch.emit($event.target.value)"
            matInput
            type="text"
            placeholder="Search"
          />
          <button *ngIf="filters.length > 0"
                  mat-icon-button
                  [mat-menu-trigger-for]="filtersMenu"
                  matSuffix>
            <mat-icon>filter_list</mat-icon>
          </button>

          <mat-menu #filtersMenu="matMenu">
            <button *ngFor="let filter of filters"
                    (click)="onFilterApply.emit(filter)"
                    mat-menu-item>
              <mat-icon *ngIf="filter.filterId == service.selectedFilter?.filterId">check</mat-icon>
              <mat-icon *ngIf="filter.filterId != service.selectedFilter?.filterId">{{ filter.icon }}</mat-icon>
              <span>{{ filter.description }}</span>
            </button>
          </mat-menu>
        </mat-form-field>

        <content-list-component
          [items]="items"
          id="content-list"
        ></content-list-component>

        <mat-paginator
          [length]="service.len"
          [pageSize]="service.pageSize"
          (page)="this.onPageTurn.emit($event)"
          style="background-color: transparent; flex: 1"
        ></mat-paginator>
      </div>

      <div style="flex: 3">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
      `
      #content-list {
        overflow-y: auto;
        flex: 4;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      #left-panel {
        flex: 1;
        background-color: transparent;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        border: none;
      }

      @media screen and (max-width: 900px) {
        #left-panel {
          display: none;
        }
      }
    `,
  ],
})
export class ContentComponent<T extends Displayable> {

  @Input()
  public service: EntityService<T>;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onSearch = new EventEmitter<string>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onFilterApply = new EventEmitter<Filter>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onPageTurn = new EventEmitter<PageEvent>();

  public get items(): T[] {
    return this.service.items;
  }

  public get filters(): Filter[] {
    return this.service.filters ?? [];
  }
}
