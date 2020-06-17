import {Component} from '@angular/core';
import {MemberService} from '../authentication/member.service';
import {BasicUser, ToolbarMode, UserType} from '../models/Model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'view-member-component',
  template: `
    <div>
      <member-toolbar-component
        (onRoleChange)="handleEdit($event)"
        [service]="memberService"
      ></member-toolbar-component>

      <div *ngIf="memberService.selectedItem !== undefined" id="info-card">
        <div style="flex: 1; display: flex; flex-direction: column; align-content: center; justify-content: center; align-items: center;">
          <img style="max-width: 200px; min-width: 100px; margin-bottom: 10px; border-radius: 100px;"
               [src]="memberService.selectedItem.photoURL"
               [alt]="memberService.selectedItem.displayName"
          />
          <mat-chip-list>
            <mat-chip *ngIf="isAdmin" color="warn" selected>Admin</mat-chip>
            <mat-chip *ngIf="isMember">Member</mat-chip>
          </mat-chip-list>
        </div>
        <member-form-component
          [isEditMode]="false"
          [user]="memberService.selectedItem"
          style="flex: 2;"
        ></member-form-component>
      </div>

    </div>
  `,
  styles: [`
    #info-card {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class ViewMemberComponent {

  public get isAdmin(): boolean {
    return this.memberService.selectedItem.type === UserType.ADMIN;
  }

  public get isMember(): boolean {
    return this.memberService.selectedItem.type === UserType.MEMBER;
  }

  constructor(public memberService: MemberService,
              public route: ActivatedRoute,
              public router: Router) {
    this.route.params.subscribe(value => {
      if (value.memberId !== undefined) {
        this.memberService.get(value.memberId);
      } else if (this.memberService.items.length > 0) {
        this.router.navigate(['members', this.memberService.items[0].userId]).then(() => {
        });
      } else {
        this.memberService.selectedFilter = undefined;
      }
    });
  }

  public handleEdit(role: UserType) {
    const current = this.memberService.selectedItem;
    current.type = role;
    this.memberService.update(current);
  }
}
