import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tableRowsPerPage } from 'src/app/shared/global.constant';
import { userDetailResponse } from 'src/app/shared/models/admin';
import { PastProjectDetailsResponse } from 'src/app/shared/models/project-management';
import { ProjectManagementService } from 'src/app/shared/services';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})

export class UserOverviewComponent implements OnInit {
  isGettingData: boolean = false;
  userDetailVM: any;
  userId: number = -1;
  userProjectsVM: any;
  first: number = 1;
  pageNo: number = 1;
  tableRowsPerPage: number = tableRowsPerPage;
  totalResults: any;
  showParent: number = 0;
  projectDetailsVM: any;
  childOrganizationName: any;
  childName: any;
  childEmail: any;
  childPhoneNumber: any;
  childCountry: any;
  joinedDate: any;
  parentOrganization: any;
  parentName: any;
  parentEmail: any;
  projectDetails: any = [];
  totalRecords: any;
  clickedTab: string = 'myprojects';
  searchInputValue: string = '';
  userType: string = '';
  loggedInUserType = sessionStorage.getItem("userType") as string;

  constructor(
    private userManagementService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private projectManagementService: ProjectManagementService,
  ) {
    this.route.queryParams.subscribe(params => {
      const userId = atob(params['userId']);
      this.userId = Number(userId);

      const showParent = atob(params['showParent']);
      this.showParent = Number(showParent);

      this.userType = atob(params['userType']);

      if (!this.userId) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    this.getUserDetail(this.userId);
    this.getProjectDetails(this.pageNo, this.clickedTab, '');
  }

  getUserDetail(childId: number) {
    this.isGettingData = true;

    this.userManagementService.getUserDetail(childId).subscribe((data: userDetailResponse) => {
      this.isGettingData = false;
      if (data && data.isSuccess) {
        this.userDetailVM = data.userDetailVM;
        this.childOrganizationName = this.userDetailVM.CHILD_ORGANIZATION;
        this.childName = this.userDetailVM.CHILD_NAME;
        this.childEmail = this.userDetailVM.CHILD_EMAIL;
        this.childPhoneNumber = this.userDetailVM.CHILD_PHONE_NUMBER;
        this.childCountry = this.userDetailVM.CHILD_COUNTRY;
        this.joinedDate = this.userDetailVM.JOINED_DATE;
        this.parentName = this.userDetailVM.PARENT_NAME;
        this.parentEmail = this.userDetailVM.PARENT_EMAIL;
        this.parentOrganization = this.userDetailVM.PARENT_ORGANIZATION;
      }
    })
  }

  onPaginate(event: PageEvent) {
    this.first = event.first;
    this.tableRowsPerPage = event.rows;
    this.getProjectDetails(event.page + 1, this.clickedTab, '');
  }

  searchProject(event: any) {
    const searchString = event.target.value;
    this.getProjectDetails(this.pageNo, this.clickedTab, searchString);
  }

  viewProject(project: any): void {
    this.router.navigate(['/project-overview'],
      {
        queryParams: {
          projectId: btoa(project.PROJECT_ID.toLocaleString()),
          userId: btoa(project.USER_ID.toLocaleString())
        }
      });
  }

  getProjectDetails(pageNo: number, tabName: string, searchString: string) {
    this.isGettingData = true;
    this.projectManagementService.getProjectDetails(this.userType, this.userId, tabName, pageNo, searchString).subscribe((data: PastProjectDetailsResponse) => {
      this.isGettingData = false;
      if (data && data.isSuccess) {
        this.projectDetails = data.projectSearchResponseDataVM?.searchResultDataVM;
        this.totalRecords = data.projectSearchResponseDataVM?.totalResults;
      }
    })
  }
}