import {Component} from '@angular/core';
import {MemberService} from '../authentication/member.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'members-page',
  template: `
    <content-component (onSearch)="memberService.onSearch($event)"
                       (onPageTurn)="memberService.pageTurn($event.pageIndex)"
                       (onFilterApply)="memberService.apply($event)"
                       [service]="memberService"
    ></content-component>
  `,
})
// tslint:disable-next-line:component-class-suffix
export class MembersPage {

  constructor(public memberService: MemberService) {
  }

}
