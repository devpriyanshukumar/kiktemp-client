import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeModule } from './home/home.module';
import { ProjectManagementModule } from './project-management/project-management.module';
import { UserManagementModule } from './user-management/user-management.module';
import { ReportModule } from './report/report.module';

export function configProviderFactory(provider: ConfigService) {
  return () => provider.load('./assets/env/environment.json');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    DashboardModule,
    HomeModule,
    ProjectManagementModule,
    UserManagementModule,
    ReportModule
  ],
  providers:
  [
    {
      provide: APP_INITIALIZER,
      useFactory: configProviderFactory,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
