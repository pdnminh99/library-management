import { BrowserModule } from "@angular/platform-browser";
import { SimpleChanges } from "@angular/core";
import { NgModule, Component, OnChanges } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

@Component({
  selector: "child-node",
  template: ` <h1>Child Node</h1> `,
})
class AppChild implements OnChanges {
  ngOnChanges(_changes: SimpleChanges): void {
    console.log("Child Node is changed.");
  }
}

@Component({
  selector: "app-root",
  template: `
    <button (click)="switch()">Click me</button>
    <h1 *ngIf="isTrue">State is true</h1>
    <h1 *ngIf="!isTrue">State is false</h1>
    <child-node></child-node>
  `,
})
class AppComponent {
  public isTrue = true;

  public switch(): void {
    this.isTrue = !this.isTrue;
  }
}

@NgModule({
  declarations: [AppComponent, AppChild],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
