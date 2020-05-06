import { Component } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";

@Component({
  selector: "main-page",
  template: ` <h1>I am {{ displayName }}</h1> `,
})
export class MainPage {
  private get displayName(): string {
    return this.auth.currentUser.displayName;
  }

  constructor(private auth: AuthenticationService) {}
}
