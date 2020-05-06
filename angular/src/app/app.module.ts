import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

@Component({
  selector: "app-root",
  template: `<h1>Hello World 1</h1>`,
})
class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
