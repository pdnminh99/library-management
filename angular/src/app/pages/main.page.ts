import { Component } from "@angular/core";

@Component({
  selector: "main-page",
  template: `
    <mat-sidenav-container class="container">
      <mat-sidenav #sidenav mode="over" class="sidenav">
        <h1 class="sivenav-title">
          Navigation
        </h1>
        <hr />
        <navigation-button-component
          [routerLink]="['dashboard']"
          icon="apps"
          title="Dashboard"
        ></navigation-button-component>
        <navigation-button-component
          [routerLink]="['resources']"
          icon="menu_book"
          [isActive]="true"
          title="Resources"
        ></navigation-button-component>
        <navigation-button-component
          [routerLink]="['members']"
          icon="people"
          title="Members"
        ></navigation-button-component>
        <navigation-button-component
          [routerLink]="['loans']"
          icon="assignment"
          title="Book Loans"
        ></navigation-button-component>
        <navigation-button-component
          [routerLink]="['account']"
          icon="person"
          title="Account"
        ></navigation-button-component>
      </mat-sidenav>
      <mat-sidenav-content>
        <navigation-component
          (onMenuButtonClicked)="sidenav.toggle()"
        ></navigation-component>

        <mat-sidenav-container
          style="height: 100%; background-color: transparent;"
        >
          <mat-sidenav
            mode="side"
            [opened]="true"
            style="background-color: transparent; border: none;"
          >
            <mini-sidenav-component></mini-sidenav-component>
          </mat-sidenav>
          <mat-sidenav-content style="padding: 20px;">
            <router-outlet></router-outlet>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .container {
        height: 100%;
        width: 100%;
      }

      .sivenav-title {
        padding-left: 20px;
        font-size: 30px;
        font-weight: bold;
        color: #236ed4;
      }

      .sidenav {
        border-radius: 7px;
        margin-top: 20px;
        margin-left: 15px;
        margin-bottom: 20px;
        padding-top: 30px;
        padding-left: 0px;
      }
    `,
  ],
})
export class MainPage {}
