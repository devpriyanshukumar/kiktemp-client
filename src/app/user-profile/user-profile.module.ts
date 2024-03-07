import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { TokenGuard } from '../shared/guards/token/token.guard';

const userProfileRouting: ModuleWithProviders<UserProfileModule> = RouterModule.forChild([
  {
    path: '',
    component: UserProfileComponent,
    canActivate: [AuthGuard, TokenGuard]
  }
]);

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    userProfileRouting,
    SharedModule
  ]
})
export class UserProfileModule { }
