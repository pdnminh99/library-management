import { Component } from "@angular/core";

@Component({
  selector: "mini-sidenav-component",
  template: `
    <div>
      <mat-toolbar style="background-color: transparent;">
        <mat-toolbar-row>
          <mini-sidenav-btn-component
            icon="apps"
            [isActive]="true"
          ></mini-sidenav-btn-component>
        </mat-toolbar-row>

        <mat-toolbar-row>
          <mini-sidenav-btn-component
            icon="menu_book"
          ></mini-sidenav-btn-component
        ></mat-toolbar-row>

        <mat-toolbar-row>
          <mini-sidenav-btn-component icon="people"></mini-sidenav-btn-component
        ></mat-toolbar-row>

        <mat-toolbar-row>
          <mini-sidenav-btn-component
            icon="assignments"
          ></mini-sidenav-btn-component
        ></mat-toolbar-row>

        <mat-toolbar-row>
          <mini-sidenav-btn-component icon="person"></mini-sidenav-btn-component
        ></mat-toolbar-row>
      </mat-toolbar>
    </div>
  `,
})
export class MiniSideNavigationComponent {}
