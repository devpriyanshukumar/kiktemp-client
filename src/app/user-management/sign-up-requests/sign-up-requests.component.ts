import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tableRowsPerPage } from 'src/app/shared/global.constant';
import { signupRequestListResponse } from 'src/app/shared/models/admin';
import { AdminService } from 'src/app/shared/services/admin.service';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-sign-up-requests',
  templateUrl: './sign-up-requests.component.html',
  styleUrls: ['./sign-up-requests.component.scss']
})

export class SignUpRequestsComponent implements OnInit {
  signupRequestList: any = [];
  first: number = 0;
  pageNo: number = 0;
  tableRowsPerPage: number = tableRowsPerPage;
  totalRecords: any;
  isGettingData: boolean = false;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSignupRequestList(this.pageNo);
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.tableRowsPerPage = event.rows;
    this.getSignupRequestList(event.page);
  }

  signup(userId: number) {
    this.router.navigate(['/user-management/sign-up-new-user'], { queryParams: { childUserId: userId } });
  }

  getSignupRequestList(pageNo: number) {
    this.isGettingData = true;
    this.adminService.getSignUpRequestList(pageNo).subscribe((signupRequestListResponse: signupRequestListResponse) => {
      this.isGettingData = false;
      if (signupRequestListResponse && signupRequestListResponse.isSuccess) {
        this.signupRequestList = signupRequestListResponse.signupRequestListResponseDataVM?.signupRequests;
        this.totalRecords = signupRequestListResponse.signupRequestListResponseDataVM?.totalRequests;
      }
    })
  }
}