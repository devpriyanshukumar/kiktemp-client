import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastProjectsComponent } from './past-projects/past-projects.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { RouteGuard } from '../shared/guards/route/route.guard';
import { TokenGuard } from '../shared/guards/token/token.guard';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { CubicleOverviewComponent } from './cubicle-overview/cubicle-overview.component';
import { SharedModule } from '../shared/shared.module';
import { RemoveProjectModalComponent } from './modal/remove-project-modal/remove-project-modal.component';

const projectManagementRouting: ModuleWithProviders<ProjectManagementModule> = RouterModule.forChild([
  {
    path: '',
    redirectTo: 'new-project',
    pathMatch: 'full'
  },
  {
    path: 'new-project',
    component: NewProjectComponent,
    canActivate: [AuthGuard, RouteGuard, TokenGuard]
  },
  {
    path: 'past-projects',
    component: PastProjectsComponent,
    canActivate: [AuthGuard, RouteGuard, TokenGuard]
  },
  {
    path: 'project-overview',
    component: ProjectOverviewComponent
  },
  {
    path: 'cubicle-overview',
    component: CubicleOverviewComponent
  }
]);

@NgModule({
  declarations: [
    PastProjectsComponent,
    NewProjectComponent,
    ProjectOverviewComponent,
    CubicleOverviewComponent,
    RemoveProjectModalComponent
  ],
  imports: [
    CommonModule,
    projectManagementRouting,
    SharedModule
  ]
})
export class ProjectManagementModule { }
