import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { tableRowsPerPage, userOverviewRoute } from 'src/app/shared/global.constant';
import { UserSearchRequest, UserSearchResponse } from 'src/app/shared/models/admin';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-customers-of-distributor',
  templateUrl: './customers-of-distributor.component.html',
  styleUrls: ['./customers-of-distributor.component.scss']
})

export class CustomersOfDistributorComponent implements OnInit {
  first: number = 0;
  pageNo: number = 0;
  tableRowsPerPage: number = tableRowsPerPage;
  totalResults: any;
  isGettingData: boolean = false;
  searchResultDataVM: any = [];
  userType: string = '';
  distributorUserId: number = -1;
  distributorOrganizationName: string = '';
  showParent1: number = 1;
  showParent0: number = 0;

  constructor(
    private userManagementService: UserManagementService,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.distributorUserId = params['distributorUserId'];
      this.distributorOrganizationName = params['distributor'];

      if (!this.distributorUserId || !this.distributorOrganizationName) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    this.getAllCustomers(this.pageNo, '');
  }

  onPaginate(event: PageEvent) {
    this.first = event.first;
    this.tableRowsPerPage = event.rows;
    this.getAllCustomers(event.page, '');
  }

  getAllCustomers(pageNo: number, searchString: string) {
    this.isGettingData = true;

    const userSearchRequest: UserSearchRequest = {
      UserSearchRequestDataVM: {
        pageNo: pageNo,
        searchString: searchString,
        childUserType: 'customer',
        parentId: this.distributorUserId
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

  searchCustomer(event: any) {
    const searchString = event.target.value;
    this.getAllCustomers(this.pageNo, searchString);
  }

  viewCustomer(userId: number, userType: string) {
    this.router.navigate([userOverviewRoute], {
      queryParams: {
        userId: btoa(userId.toLocaleString()),
        showParent: btoa(this.showParent1.toLocaleString()),
        userType: btoa(userType)
      }
    });
  }
}
