import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResourcePage} from './pages/resources.page';
import {DashboardPage} from './pages/dashboard.page';
import {MembersPage} from './pages/members.page';
import {BookLoansPage} from './pages/book-loans.page';
import {AccountPage} from './pages/account.page';
import {ViewResourceComponent} from './components/view-resource.component';
import {ViewMemberComponent} from './components/view-member.component';
import {ViewLoanComponent} from './components/view-loan.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardPage,
  },
  {
    path: 'resources',
    component: ResourcePage,
    children: [
      {
        path: '',
        component: ViewResourceComponent,
      },
      {
        path: ':bookId',
        component: ViewResourceComponent,
      },
      {
        path: '*',
        redirectTo: '',
      },
    ],
  },
  {
    path: 'members',
    component: MembersPage,
    children: [
      {
        path: '',
        component: ViewMemberComponent,
      },
      {
        path: ':memberId',
        component: ViewMemberComponent,
      },
      {
        path: '*',
        redirectTo: '',
      },
    ],
  },
  {
    path: 'loans',
    component: BookLoansPage,
    children: [
      {
        path: '',
        component: ViewLoanComponent,
      },
      {
        path: ':loanId',
        component: ViewLoanComponent,
      },
      {
        path: '*',
        redirectTo: '',
      },
    ],
  },
  {
    path: 'account',
    component: AccountPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
