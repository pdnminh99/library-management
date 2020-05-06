import { Component } from "@angular/core";
import { FirebaseApp } from "@angular/fire";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
})
export class AppRoot {
  constructor(public app: FirebaseApp) {}
}
