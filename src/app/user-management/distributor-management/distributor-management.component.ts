import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { customerListRoute, disabled, removeContent, removeHeader, removed, suspendContent, suspendHeader, suspended, tableRowsPerPage, unsuspendContent, unsuspendHeader, unsuspended, userOverviewRoute, verified, width40, zIndex10000 } from 'src/app/shared/global.constant';
import { UserSearchRequest, UserSearchResponse } from 'src/app/shared/models/admin';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { SuspendRemoveUserModalComponent } from '../modal/suspend-remove-user-modal/suspend-remove-user-modal.component';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-distributor-management',
  templateUrl: './distributor-management.component.html',
  styleUrls: ['./distributor-management.component.scss']
})
export class DistributorManagementComponent implements OnInit {
  first: number = 0;
  pageNo: number = 0;
  tableRowsPerPage: number = tableRowsPerPage;
  isGettingData: boolean = false;
  suspended: string = suspended;
  verified: string = verified;
  unsuspended: string = unsuspended;
  removed: string = removed;
  disabled: string = disabled;
  searchResultDataVM: any = [];
  totalResults: any;
  userId: number = -1;
  showParent1: number = 1;
  showParent0: number = 0;
  lastSearchString: string = '';

  constructor(
    private userManagementService: UserManagementService,
    private router: Router,
    public dialogService: DialogService
  ) {
    this.userId = Number(sessionStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.getAllDistributors(this.pageNo, '');
  }

  onPaginate(event: PageEvent) {
    this.first = event.first;
    this.tableRowsPerPage = event.rows;
    this.pageNo = event.page
    this.getAllDistributors(this.pageNo, this.lastSearchString);
  }

  getAllDistributors(pageNo: number, searchString: string) {
    this.isGettingData = true;

    const userSearchRequest: UserSearchRequest = {
      UserSearchRequestDataVM: {
        pageNo: pageNo,
        searchString: searchString,
        childUserType: 'distributor',
        parentId: 0
      }
    }

    this.userManagementService.userSearch(userSearchRequest).subscribe((data: UserSearchResponse) => {
      this.isGettingData = false;
      if (data && data.isSuccess) {
        this.searchResultDataVM = data.userSearchResponseDataVM?.searchResultDataVM;
        this.totalResults = data.userSearchResponseDataVM?.totalResults;
      }
    })
  }

  handleDataUpdated(): void {
    this.first = 0;
    this.pageNo = 0;
    this.getAllDistributors(this.pageNo, '');
  }

  searchDistributor(event: any) {
    const searchString = event.target.value;
    this.lastSearchString = searchString;
    this.pageNo = 0;
    this.getAllDistributors(this.pageNo, searchString);
  }

  clickNavigate(userId: number, userType: string) {
    this.router.navigate([userOverviewRoute], {
      queryParams: {
        userId: btoa(userId.toLocaleString()),
        showParent: btoa(this.showParent0.toLocaleString()),
        userType: btoa(userType)
      }
    });
  }

  clickSuspend(userId: number, userName: string) {
    const dialogRef = this.dialogService.open(SuspendRemoveUserModalComponent, {
      header: suspendHeader,
      width: width40,
      baseZIndex: zIndex10000,
      closable: false,
      data: {
        content: suspendContent,
        btnText: 'SUSPEND USER',
        selectedUserId: userId,
        selectedUserName: userName,
        loggedInUserId: this.userId
      },
    });

    dialogRef.onClose.subscribe((data) => {
      if (data.refreshTable) {
        this.handleDataUpdated();
      }
    });
  }

  clickUnsuspend(userId: number, userName: string) {
    const dialogRef = this.dialogService.open(SuspendRemoveUserModalComponent, {
      header: unsuspendHeader,
      width: width40,
      baseZIndex: zIndex10000,
      closable: false,
      data: {
        content: unsuspendContent,
        btnText: 'UNSUSPEND USER',
        selectedUserId: userId,
        selectedUserName: userName,
        loggedInUserId: this.userId
      },
    });

    dialogRef.onClose.subscribe((data) => {
      if (data.refreshTable) {
        this.handleDataUpdated();
      }
    });
  }

  clickRemove(userId: number, userName: string) {
    const dialogRef = this.dialogService.open(SuspendRemoveUserModalComponent, {
      header: removeHeader,
      width: width40,
      baseZIndex: zIndex10000,
      closable: false,
      data: {
        content: removeContent,
        btnText: 'REMOVE USER',
        selectedUserId: userId,
        selectedUserName: userName,
        loggedInUserId: this.userId
      },
    });

    dialogRef.onClose.subscribe((data) => {
      if (data.refreshTable) {
        this.handleDataUpdated();
      }
    });
  }

  viewCustomers(userId: number, distributorOrganizationName: string) {
    this.router.navigate([customerListRoute], {
      queryParams: {
        distributorUserId: userId,
        distributor: distributorOrganizationName
      }
    });
  }
}
