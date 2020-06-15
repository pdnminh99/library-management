import {Component} from '@angular/core';
import {MemberService} from '../authentication/member.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'members-page',
  template: `
    <content-component [service]="memberService"></content-component>
  `,
})
// tslint:disable-next-line:component-class-suffix
export class MembersPage {

  constructor(public memberService: MemberService) {
  }

}
