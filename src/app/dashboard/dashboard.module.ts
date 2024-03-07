import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth/auth.guard';

const dashboardRouting: ModuleWithProviders<DashboardModule> = RouterModule.forChild([
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    dashboardRouting
  ]
})
export class DashboardModule { }
