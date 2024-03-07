import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewReportComponent } from './view-report/view-report.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { TokenGuard } from '../shared/guards/token/token.guard';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from 'primeng/chart';

const reportRouting: ModuleWithProviders<ReportModule> = RouterModule.forChild([
  {
    path: '',
    component: ViewReportComponent,
    canActivate: [AuthGuard, TokenGuard]
  }
]);

@NgModule({
  declarations: [
    ViewReportComponent
  ],
  imports: [
    CommonModule,
    reportRouting,
    SharedModule,
    ChartModule
  ]
})
export class ReportModule { }
