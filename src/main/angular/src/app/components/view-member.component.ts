import {Component} from '@angular/core';
import {MemberService} from '../authentication/member.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'view-member-component',
  template: `
    <div>
      <toolbar-component [service]="memberService"></toolbar-component>
      View member detail works!
    </div>
  `
})
export class ViewMemberComponent {
  constructor(public memberService: MemberService) {
  }
}
