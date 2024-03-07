import { Component, OnInit } from '@angular/core';
import {
  mobileWidth,
  removeProjectContent,
  removeProjectHeader,
  tableRowsPerPage,
  width40,
  zIndex10000,
} from 'src/app/shared/global.constant';
import { PastProjectDetailsResponse } from 'src/app/shared/models/project-management';
import { ProjectManagementService } from 'src/app/shared/services/project-management.service';
import { RemoveProjectModalComponent } from '../modal/remove-project-modal/remove-project-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-past-projects',
  templateUrl: './past-projects.component.html',
  styleUrls: ['./past-projects.component.scss'],
})
export class PastProjectsComponent implements OnInit {
  activeIndex: number = 0;
  userType = sessionStorage.getItem('userType') as string;
  userId = Number(sessionStorage.getItem('userId'));
  projectDetails: any = [];
  first: number = 0;
  pageNo: number = 1;
  tableRowsPerPage: number = tableRowsPerPage;
  totalRecords: any;
  isGettingData: boolean = false;
  clickedTab: string = 'myprojects';
  searchInputValue: string = '';
  screenWidth: number = 0;
  mobileWidth: number = mobileWidth;
  lastSearchString: string = '';

  constructor(
    private projectManagementService: ProjectManagementService,
    public dialogService: DialogService,
    private router: Router
  ) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.getProjectDetails(this.pageNo, this.clickedTab, '');
  }

  getProjectDetails(pageNo: number, tabName: string, searchString: string) {
    this.isGettingData = true;
    this.projectManagementService
      .getProjectDetails(
        this.userType,
        this.userId,
        tabName,
        pageNo,
        searchString
      )
      .subscribe((data: PastProjectDetailsResponse) => {
        this.isGettingData = false;
        if (data && data.isSuccess) {
          this.projectDetails =
            data.projectSearchResponseDataVM?.searchResultDataVM;
          this.totalRecords = data.projectSearchResponseDataVM?.totalResults;
        }
      });
  }

  handleTabClick(event: any) {
    this.searchInputValue = '';
    this.clickedTab = event?.index === 0 ? 'myprojects' : 'allprojects';
    this.getProjectDetails(this.pageNo, this.clickedTab, '');
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.tableRowsPerPage = event.rows;
    this.pageNo = event.page + 1;
    this.getProjectDetails(this.pageNo, this.clickedTab, this.lastSearchString);
  }

  clickDelete(projectId: number) {
    const dialogRef = this.dialogService.open(RemoveProjectModalComponent, {
      header: removeProjectHeader,
      width: width40,
      baseZIndex: zIndex10000,
      closable: false,
      data: {
        content: removeProjectContent,
        loggedInUserId: this.userId,
        selectedProjectId: projectId,
      },
    });

    dialogRef.onClose.subscribe((data: any) => {
      if (data.refreshTable) {
        this.handleDataUpdated();
      }
    });
  }

  handleDataUpdated(): void {
    this.first = 1;
    this.pageNo = 1;
    this.getProjectDetails(this.pageNo, this.clickedTab, '');
  }

  searchProject(event: any) {
    const searchString = event.target.value;
    this.lastSearchString = searchString;
    this.pageNo = 1;
    this.getProjectDetails(this.pageNo, this.clickedTab, searchString);
  }

  viewProject(project: any): void {
    this.router.navigate(['/project-overview'], {
      queryParams: {
        projectId: btoa(project.PROJECT_ID.toLocaleString()),
        userId: btoa(project.USER_ID.toLocaleString()),
      },
    });
  }
}
