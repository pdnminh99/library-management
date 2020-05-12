import { Component } from "@angular/core";

@Component({
  selector: "login-component",
  template: `
    <div style="display: table; width: 100%; height: 100%;">
      <login-card-component style="display: table-cell; vertical-align: middle;"></login-card-component>
    </div>
  `,
  styles: [``],
})
export class LoginComponent {}
