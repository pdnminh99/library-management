import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Displayable, EntityService, ToolbarMode, UserType} from '../models/Model';
import {MatDialog} from '@angular/material/dialog';
import {RoleChangeConfirmComponent} from './role-change-confirm.component';
import {MemberService} from '../authentication/member.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'member-toolbar-component',
  template: `
    <mat-toolbar id="toolbar">
      <button (click)="handleButtonClick(0)"
              [disabled]="disableAll || !service.isActive || currentRole === 'GUEST'"
              mat-flat-button style="margin-right: 10px;">
        <mat-icon>create</mat-icon>
        Switch to Guest
      </button>

      <button (click)="handleButtonClick(1)"
              [disabled]="disableAll || !service.isActive || currentRole === 'MEMBER'"
              mat-flat-button style="margin-right: 10px;">
        <mat-icon>create</mat-icon>
        Switch to Member
      </button>

      <button (click)="handleButtonClick(2)"
              [disabled]="disableAll || !service.isActive || currentRole === 'ADMIN'"
              mat-flat-button style="margin-right: 10px;">
        <mat-icon>create</mat-icon>
        Switch to Admin
      </button>
    </mat-toolbar>
  `,
  styles: [`
    #toolbar {
      display: flex;
      align-items: center;
      height: 51px;
      justify-content: center;
      border-top: solid black 1px;
      border-bottom: solid black 1px;
    }
  `]
})
export class MemberToolbarComponent {

  public get currentRole(): UserType {
    return this.service.selectedItem?.type;
  }

  @Input()
  public service: MemberService;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onRoleChange = new EventEmitter<UserType>();

  constructor(public dialog: MatDialog) {
  }

  public handleButtonClick(index: number) {
    let role: UserType;

    switch (index) {
      case 0:
        role = UserType.GUEST;
        break;
      case 1:
        role = UserType.MEMBER;
        break;
      case 2:
      default:
        role = UserType.ADMIN;
        break;
    }

    const dialogRef = this.dialog.open(RoleChangeConfirmComponent, {
      data: {
        displayName: this.service.selectedItem.displayName,
        from: this.currentRole,
        to: role
      }
    });

    dialogRef.afterClosed().subscribe(({answer}) => {
      if (answer) {
        this.onRoleChange.emit(role);
      }
    });

  }

  public get disableAll(): boolean {
    return this.service.isProcessing || this.service.mode !== ToolbarMode.STATIC || this.currentRole === undefined;
  }
}
