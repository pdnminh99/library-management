import { Component } from "@angular/core";

@Component({
  selector: "mini-sidenav-component",
  template: `
    <div>
      <mat-toolbar style="background-color: transparent;">
        <mat-toolbar-row class="mini-sidenav-toolbar">
          <mini-sidenav-btn-component
            icon="apps"
            [routerLink]="['dashboard']"
          ></mini-sidenav-btn-component>
        </mat-toolbar-row>

        <mat-toolbar-row class="mini-sidenav-toolbar">
          <mini-sidenav-btn-component
            [isActive]="true"
            icon="menu_book"
            [routerLink]="['resources']"
          ></mini-sidenav-btn-component
        ></mat-toolbar-row>

        <mat-toolbar-row class="mini-sidenav-toolbar">
          <mini-sidenav-btn-component
            icon="people"
            [routerLink]="['members']"
          ></mini-sidenav-btn-component
        ></mat-toolbar-row>

        <mat-toolbar-row class="mini-sidenav-toolbar">
          <mini-sidenav-btn-component
            icon="assignments"
            [routerLink]="['loans']"
          ></mini-sidenav-btn-component
        ></mat-toolbar-row>

        <mat-toolbar-row class="mini-sidenav-toolbar">
          <mini-sidenav-btn-component
            icon="person"
            [routerLink]="['account']"
          ></mini-sidenav-btn-component
        ></mat-toolbar-row>
      </mat-toolbar>
    </div>
  `,
  styles: [
    `
      .mini-sidenav-toolbar {
        padding: 0 0;
      }
    `,
  ],
})
export class MiniSideNavigationComponent {}
