import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {BasicUser} from '../models/Model';
import {isNullOrUndefined} from 'util';
import {MemberService} from '../authentication/member.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'members-page',
  template: `
    <div style="height: 100%; display: flex;">
      <div id="left-panel">
        <mat-form-field id="mini-searchbar" appearance="fill">
          <input
            matInput
            type="text"
            placeholder="Search"
            [(ngModel)]="searchValue"
          />
          <button matSuffix mat-icon-button>
            <mat-icon>filter_list</mat-icon>
          </button>
        </mat-form-field>

        <content-list-component
          [items]="members"
          id="content-list"></content-list-component>

        <mat-paginator
          [length]="100"
          [pageSize]="10"
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
// tslint:disable-next-line:component-class-suffix
export class MembersPage {

  public searchValue = '';

  constructor(public memberService: MemberService, private router: Router) {
  }

  public get members(): BasicUser[] {
    // tslint:disable-next-line:triple-equals
    if (this.searchValue.trim().length == 0) {
      return this.memberService.members;
    }
    return this.memberService.members.filter(
      (book) =>
        !isNullOrUndefined(book.title) && book.title.includes(this.searchValue)
    );
  }
}
