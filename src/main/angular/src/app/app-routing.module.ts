import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResourcePage} from './pages/resources.page';
import {DashboardPage} from './pages/dashboard.page';
import {MembersPage} from './pages/members.page';
import {BookLoansPage} from './pages/book-loans.page';
import {AccountPage} from './pages/account.page';
import {CreateResourceFormComponent} from './components/create-resource-form.component';
import {ViewResourceComponent} from './components/view-resource.component';

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
        path: 'create',
        component: CreateResourceFormComponent,
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
  },
  {
    path: 'loans',
    component: BookLoansPage,
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
