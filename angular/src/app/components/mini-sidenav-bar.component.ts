import { Component } from "@angular/core";

@Component({
  selector: "mini-sidenav-component",
  template: `
    <div>
      <mat-toolbar style="background-color: transparent;">
        <mat-toolbar-row>
          <button mat-icon-button>
            <mat-icon>apps</mat-icon>
          </button>
        </mat-toolbar-row>

        <mat-toolbar-row>
          <button mat-icon-button>
            <mat-icon>menu_book</mat-icon>
          </button>
        </mat-toolbar-row>

        <mat-toolbar-row>
          <button mat-icon-button>
            <mat-icon>people</mat-icon>
          </button>
        </mat-toolbar-row>

        <mat-toolbar-row>
          <button mat-icon-button>
            <mat-icon>assignment</mat-icon>
          </button>
        </mat-toolbar-row>

        <mat-toolbar-row>
          <button mat-icon-button>
            <mat-icon>person</mat-icon>
          </button>
        </mat-toolbar-row>
      </mat-toolbar>
    </div>
  `,
})
export class MiniSideNavigationComponent {}
