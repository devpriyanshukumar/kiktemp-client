import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  emailPattern,
  enterValidInput,
  requiredField,
} from 'src/app/shared/global.constant';
import {
  LoginRequest,
  LoginResponse,
  LoginResponseDataVM,
} from 'src/app/shared/models/home';
import {
  MatchedRouteResponse,
  MatchedRouteRequest,
} from 'src/app/shared/models/referenceData';
import {
  DataSharingService,
  ReferenceDataService,
} from 'src/app/shared/services';
import { HomeService } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  requiredField: string = requiredField;
  enterValidInput: string = enterValidInput;
  passwordStr: string = 'password';
  textStr: string = 'text';
  passwordFieldType: string = '';
  emailPattern: string = emailPattern;
  submittingData: boolean = false;
  loginResponseData!: LoginResponseDataVM;
  bearerToken: string = '';
  userId: number = 0;
  childUserId: number = 0;
  userType: string = '';
  userName: string = '';
  redirectTo: any;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private homeService: HomeService,
    private router: Router,
    private referenceService: ReferenceDataService,
    private dataSharingService: DataSharingService
  ) {
    // Check for redirectTo, userId in query params
    this.redirectTo = this.router.parseUrl(this.router.url).queryParams['redirectTo'];
    this.childUserId = this.router.parseUrl(this.router.url).queryParams['childUserId'];
  }

  ngOnInit(): void {
    this.passwordFieldType = this.passwordStr;
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === this.passwordStr
        ? this.textStr
        : this.passwordStr;
  }

  login() {
    this.submittingData = true;

    const requestData: LoginRequest = {
      loginRequestDataVM: {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      },
    };

    this.homeService
      .login(requestData)
      .subscribe((loginResponse: LoginResponse) => {
        if (loginResponse.isSuccess && loginResponse.loginResponseDataVM) {
          this.loginResponseData = loginResponse.loginResponseDataVM;

          this.bearerToken = this.loginResponseData.bearer!;
          this.userId = this.loginResponseData.id!;
          this.userType = this.loginResponseData.userRole!;
          this.userName = this.loginResponseData.userName!;
          const message = this.loginResponseData.message;

          // Store in session storage
          sessionStorage.setItem('bearerToken', this.bearerToken);
          sessionStorage.setItem('userId', this.userId.toString());
          sessionStorage.setItem('userType', this.userType);
          sessionStorage.setItem('userName', this.userName);

          const MatchedRouteRequest: MatchedRouteRequest = {
            MatchedRouteRequestDataVM: {
              userType: this.userType,
            },
          };

          // Set allowed routes based on user type into data sharing service
          this.referenceService
            .getMatchedRoutes(MatchedRouteRequest)
            .subscribe((matchedRouteResponse: MatchedRouteResponse) => {
              this.dataSharingService.setMatchedRouteResponse(
                matchedRouteResponse
              );
              this.submittingData = false;

              //Success message popup
              // this.messageService.add({ severity: 'success', summary: 'Successful', detail: message });

              if (this.redirectTo) {
                this.router.navigate(['/user-management/sign-up-new-user'], {
                  queryParams: { userId: this.userId.toString() },
                });
              }
              // Navigate to the Home page
              else {
                this.router.navigate(['/']);
              }
            });
        } else {
          this.submittingData = false;

          //Success message popup
          // this.messageService.add({ severity: 'success', summary: 'Successful', detail: message });

          if (this.redirectTo) {
            this.router.navigate(['/user-management/sign-up-new-user'], { queryParams: { childUserId: this.childUserId.toString() } });
          }
          // Navigate to the Home page
          else {
            this.router.navigate(['/']);
          }
        }
      });
  }
}