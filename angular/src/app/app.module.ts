import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";

import { LoginComponent } from "./pages/login.page";
import { LoginCardComponent } from "./components/login-card.component";
import { MatInputModule } from "@angular/material/input";
import { AppRoot } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatPaginatorModule } from "@angular/material/paginator";

import { environment } from "src/environments/environment";
import { SearchBarComponent } from "./components/search-bar.component";
import { MainPage } from "./pages/main.page";
import { NavigationComponent } from "./components/navigation-bar.component";
import { NavigationButtonComponent } from "./components/navigation-btn.component";
import { NavigationControlComponent } from "./components/navigation-control.component";
import { MiniSideNavigationComponent } from "./components/mini-sidenav-bar.component";
import { ContentComponent } from "./components/content.component";
import { ContentRowComponent } from "./components/content-row.component";
import { MiniSideNavigationButtonComponent } from "./components/mini-sidenav-btn.component";

@NgModule({
  declarations: [
    AppRoot,
    LoginComponent,
    LoginCardComponent,
    SearchBarComponent,
    NavigationComponent,
    NavigationButtonComponent,
    MiniSideNavigationComponent,
    MiniSideNavigationButtonComponent,
    ContentComponent,
    MainPage,
    NavigationControlComponent,
    ContentRowComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppRoot],
})
export class AppModule {}
