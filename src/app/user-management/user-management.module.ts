import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpNewUserComponent } from './sign-up-new-user/sign-up-new-user.component';
import { RouterModule } from '@angular/router';
import { SignUpRequestsComponent } from './sign-up-requests/sign-up-requests.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { DistributorManagementComponent } from './distributor-management/distributor-management.component';
import { SharedModule } from '../shared/shared.module';
import { TruncatePipe } from '../shared/pipe/truncate.pipe';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { RouteGuard } from '../shared/guards/route/route.guard';
import { TokenGuard } from '../shared/guards/token/token.guard';
import { SuspendRemoveUserModalComponent } from './modal/suspend-remove-user-modal/suspend-remove-user-modal.component';
import { CustomersOfDistributorComponent } from './customers-of-distributor/customers-of-distributor.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';

const userManagementRouting: ModuleWithProviders<UserManagementModule> = RouterModule.forChild([
  {
    path: '',
    redirectTo: 'sign-up-new-user', 
    pathMatch: 'full' 
  },
  {
    path: 'sign-up-new-user',
    component: SignUpNewUserComponent,
    canActivate: [AuthGuard, RouteGuard, TokenGuard]
  },
  {
    path: 'sign-up-requests',
    component: SignUpRequestsComponent,
    canActivate: [AuthGuard, RouteGuard, TokenGuard]
  },
  {
    path: 'customer-management',
    component: CustomerManagementComponent,
    canActivate: [AuthGuard, RouteGuard, TokenGuard]
  },
  {
    path: 'distributor-management',
    component: DistributorManagementComponent,
    canActivate: [AuthGuard, RouteGuard, TokenGuard]
  },
  {
    path: 'customers-of-distributor',
    component: CustomersOfDistributorComponent,
    canActivate: [AuthGuard, RouteGuard, TokenGuard]
  },
  {
    path: 'user-overview',
    component: UserOverviewComponent,
    canActivate: [AuthGuard, RouteGuard, TokenGuard]
  }
]);

@NgModule({
  declarations: [
    SignUpNewUserComponent,
    SignUpRequestsComponent,
    CustomerManagementComponent,
    DistributorManagementComponent,
    TruncatePipe,
    SuspendRemoveUserModalComponent,
    CustomersOfDistributorComponent,
    UserOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    userManagementRouting
  ]
})
export class UserManagementModule { }
