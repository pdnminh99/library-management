import { Component } from "@angular/core";

@Component({
  selector: "content-component",
  template: `
    <mat-sidenav-container style="height: 100%;">
      <mat-sidenav
        [opened]="true"
        mode="side"
        style="background-color: transparent; border: none; width: 300px;"
      >
        <mat-form-field style="padding: 0; width: 100%;" appearance="fill">
          <input matInput type="text" placeholder="Search" />
          <button matSuffix mat-icon-button>
            <mat-icon>filter_list</mat-icon>
          </button>
        </mat-form-field>
        <div style="height: 500px; overflow-y: auto;">
          <content-row-component
            [isActive]="true"
            title="Harry Potter and the Sorcerer Stone"
            description="Lorem Ipsum"
          ></content-row-component>

          <content-row-component
            title="Harry Potter and the Chamber of Secret"
            description="Lorem Ipsum"
          ></content-row-component>

          <content-row-component
            title="Harry Potter and the Prisoner of Azkaban"
            description="Lorem Ipsum"
          ></content-row-component>

          <content-row-component
            title="Harry Potter and the Goblet of Fire"
            description="Lorem Ipsum"
          ></content-row-component>

          <content-row-component
            title="Harry Potter and the Order of Pheonix"
            description="Lorem Ipsum"
          ></content-row-component>

          <content-row-component
            title="Harry Potter and the Half Blood Prince"
            description="Lorem Ipsum"
          ></content-row-component>

          <content-row-component
            title="Harry Potter and the Deathly Hallow"
            description="Lorem Ipsum"
          ></content-row-component>

          <content-row-component
            title="Harry Potter and the Deathly Hallow"
            description="Lorem Ipsum"
          ></content-row-component>
        </div>

        <mat-paginator
          [length]="100"
          [pageSize]="10"
          style="width: 100%; background-color: transparent; text-align: left;"
        ></mat-paginator>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar
          style="bottom: 0; position: relative; border-top: solid black 1px; border-bottom: solid black 1px;"
        >
          <button mat-flat-button style="margin-right: 10px;">
            <mat-icon>add_circle_outline</mat-icon> Create
          </button>
          <button mat-flat-button style="margin-right: 10px;">
            <mat-icon>create</mat-icon> Edit
          </button>
          <button mat-flat-button style="margin-right: 10px;">
            <mat-icon>delete</mat-icon> Delete
          </button>
          <button mat-flat-button style="margin-right: 10px;">
            <mat-icon>refresh</mat-icon> Refresh
          </button>
        </mat-toolbar>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [``],
})
export class ContentComponent {}
