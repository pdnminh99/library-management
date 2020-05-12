import { Component } from "@angular/core";

@Component({
  selector: "main-page",
  template: `
    <mat-sidenav-container style="height: 100%; width: 100%;">
      <mat-sidenav #sidenav mode="over" class="sidenav">
        <h1 style="padding-left: 20px; font-size: 30px; font-weight: bold;">
          Navigation
        </h1>
        <hr />
        <navigation-button-component
          icon="apps"
          title="Dashboard"
        ></navigation-button-component>
        <navigation-button-component
          icon="apps"
          title="Books"
        ></navigation-button-component>
        <navigation-button-component
          icon="apps"
          title="Members"
        ></navigation-button-component>
        <navigation-button-component
          icon="apps"
          title="Book Loans"
        ></navigation-button-component>
        <navigation-button-component
          icon="apps"
          title="Account"
        ></navigation-button-component>
      </mat-sidenav>
      <mat-sidenav-content>
        <navigation-component
          (onMenuButtonClicked)="sidenav.toggle()"
        ></navigation-component>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
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
