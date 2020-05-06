import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { LoginComponent } from "./pages/login.page";
import { LoginCardComponent } from "./components/login-card.component";
import { MatInputModule } from "@angular/material/input";
import { AppRoot } from "./app.component";

@NgModule({
  declarations: [AppRoot, LoginComponent, LoginCardComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppRoot],
})
export class AppModule {}
