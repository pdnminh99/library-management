import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './pages/login.page';
import {LoginCardComponent} from './components/login-card.component';
import {MatInputModule} from '@angular/material/input';
import {AppRoot} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {environment} from 'src/environments/environment';
import {SearchBarComponent} from './components/search-bar.component';
import {MainPage} from './pages/main.page';
import {NavigationComponent} from './components/navigation-bar.component';
import {NavigationButtonComponent} from './components/navigation-btn.component';
import {NavigationControlComponent} from './components/navigation-control.component';
import {MiniSideNavigationComponent} from './components/mini-sidenav-bar.component';
import {ContentComponent} from './components/content.component';
import {ContentRowComponent} from './components/content-row.component';
import {MiniSideNavigationButtonComponent} from './components/mini-sidenav-btn.component';
import {ResourcePage} from './pages/resources.page';
import {DashboardPage} from './pages/dashboard.page';
import {BookLoansPage} from './pages/book-loans.page';
import {AccountPage} from './pages/account.page';
import {MembersPage} from './pages/members.page';
import {SearchPage} from './pages/search.page';
import {ToolbarComponent} from './components/toolbar.component';
import {ViewResourceComponent} from './components/view-resource.component';
import {HttpClientModule} from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {BookStatusComponent} from './components/book-status.component';
import {MatSelectModule} from '@angular/material/select';
import {ContentListComponent} from './components/content-list.component';
import {ViewMemberComponent} from './components/view-member.component';
import {BookStaticDisplayComponent} from './components/book-static-display.component';
import {DeleteConfirmDialogComponent} from './components/delete-confirm-dialog.component';
import {BookFormComponent} from './components/book-form.component';
import {MemberFormComponent} from './components/member-form.component';
import {MemberToolbarComponent} from './components/member-toolbar.component';
import {RoleChangeConfirmComponent} from './components/role-change-confirm.component';
import {ViewLoanComponent} from './components/view-loan.component';
import {LoanToolbarComponent} from './components/loan-toolbar.component';
import {LoanDeleteConfirmComponent} from './components/loan-delete-confirm.component';
import {LoanFormComponent} from './components/loan-form.component';

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
    ResourcePage,
    DashboardPage,
    SearchPage,
    BookLoansPage,
    AccountPage,
    MembersPage,
    ContentRowComponent,
    ToolbarComponent,
    ViewResourceComponent,
    BookStatusComponent,
    ContentListComponent,
    ViewMemberComponent,
    BookStaticDisplayComponent,
    DeleteConfirmDialogComponent,
    BookFormComponent,
    MemberFormComponent,
    MemberToolbarComponent,
    RoleChangeConfirmComponent,
    ViewLoanComponent,
    LoanToolbarComponent,
    LoanDeleteConfirmComponent,
    LoanFormComponent
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
    MatMenuModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatChipsModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppRoot],
})
export class AppModule {
}
