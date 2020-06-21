import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResourcePage} from './pages/resources.page';
import {DashboardPage} from './pages/dashboard.page';
import {MembersPage} from './pages/members.page';
import {AccountPage} from './pages/account.page';
import {ViewResourceComponent} from './components/view-resource.component';
import {ViewMemberComponent} from './components/view-member.component';
import {AdminGuard} from './guards/admin.guard';
import {MemberGuard} from './guards/member.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
  },
  {
    path: 'resources',
    component: ResourcePage,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: ViewResourceComponent,
        canActivate: [AdminGuard],
      },
      {
        path: ':bookId',
        component: ViewResourceComponent,
        canActivate: [AdminGuard],
      },
      {
        path: '*',
        redirectTo: '',
        canActivate: [AdminGuard]
      },
    ],
  },
  {
    path: 'members',
    component: MembersPage,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: ViewMemberComponent,
        canActivate: [AdminGuard],
      },
      {
        path: ':memberId',
        component: ViewMemberComponent,
        canActivate: [AdminGuard],
      },
      {
        path: '*',
        redirectTo: '',
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: 'account',
    component: AccountPage,
    canActivate: [MemberGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
